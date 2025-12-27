export const runtime = "nodejs";
console.log("DB MIME:", data.mime_type);
console.log("DB NAME:", data.original_name);

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { code, password } = await req.json();

    if (!code || !password) {
      return NextResponse.json(
        { error: "Missing code or password" },
        { status: 400 }
      );
    }

    // 🔎 DB = SOURCE OF TRUTH
    const { data, error } = await supabase
      .from("uploads")
     .select("file_path, password_hash, expires_at, original_name, mime_type")
      .eq("code", code)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid code" },
        { status: 404 }
      );
    }

    // ⏰ EXPIRY CHECK (RULE SAFE)
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "File expired" },
        { status: 410 }
      );
    }

    // 🔐 PASSWORD VERIFY (THIS WAS MISSING)
    const isValid = await bcrypt.compare(password, data.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // 📦 DOWNLOAD FROM STORAGE
    const { data: file, error: downloadError } =
      await supabase.storage
        .from("files")
        .download(data.file_path);

    if (downloadError || !file) {
      return NextResponse.json(
        { error: "File missing in storage" },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
   console.log("DOWNLOAD:", data.original_name, data.mime_type);
    return new Response(buffer, {
      headers:
        "Content-Disposition": `attachment; filename="${data.file_path.split("/").pop()}"`
      }
    });

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
