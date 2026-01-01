export const runtime = "nodejs";

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { code, password } = await req.json();

    const { data, error } = await supabase
      .from("uploads")
      .select("file_path, password_hash, expires_at, original_name, mime_type")
      .eq("code", code)
      .single();

    if (error || !data) {
      return new Response("Invalid code", { status: 404 });
    }

    if (new Date(data.expires_at) < new Date()) {
      return new Response("Expired", { status: 410 });
    }

    const valid = await bcrypt.compare(password, data.password_hash);
    if (!valid) {
      return new Response("Wrong password", { status: 401 });
    }

    const { data: file } = await supabase.storage
      .from("files")
      .download(data.file_path);

    if (!file) {
      return new Response("File missing", { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    console.log("DOWNLOAD MIME:", data.mime_type);

    return new Response(buffer, {
      headers: {
        "Content-Type": row.mime_type,
        "Content-Disposition": `attachment; filename="${row.original_name}"`,
      },
    });
  } catch {
    return new Response("Server error", { status: 500 });
  }
}
