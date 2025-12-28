export const runtime = "nodejs";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import mime from "mime-types";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const EXPIRES_IN_HOURS = 1;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const code = formData.get("code") as string | null;
    const password = formData.get("password") as string;

    if (!file || !code || !password) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const detectedMime =
      mime.lookup(file.name) || "application/octet-stream";

    console.log("UPLOAD MIME:", detectedMime);

    const timestamp = Date.now();
    const filePath = `uploads/${code}-${timestamp}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("files")
      .upload(filePath, file);

    if (uploadError) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const expiresAt = new Date(
      Date.now() + EXPIRES_IN_HOURS * 60 * 60 * 1000
    ).toISOString();

    const passwordHash = await bcrypt.hash(password, 10);

    await supabase.from("uploads").insert([
      {
        code,
        file_path: filePath,
        original_name: file.name,
        mime_type: detectedMime,
        uploaded_at: new Date().toISOString(),
        expires_at: expiresAt,
        password_hash: passwordHash,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
