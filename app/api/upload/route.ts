import mime from "mime-types";
export const runtime = "nodejs";

console.log("SUPABASE_URL =", process.env.SUPABASE_URL)

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB
const EXPIRES_IN_HOURS = 1 // 1 hour

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 🔒 FORCE JSON FOR GET
export async function GET() {
  return NextResponse.json(
    { error: "Method GET not allowed" },
    { status: 405 }
  )
}

// 🔒 FORCE JSON FOR PREFLIGHT / CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const code = formData.get("code") as string | null
    const password = formData.get("password") as string;
    const passwordHash = await bcrypt.hash(password, 10);
    
    if (!file || !code) {
      return NextResponse.json(
        { error: "Missing file or code" },
        { status: 400 }
      );
    }

    const detectedMime =
      mime.lookup(file.name) || "application/octet-stream";

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max allowed size is 50MB." },
        { status: 413 }
      )
    }
   
    const timestamp = Date.now()
    const filePath = `uploads/${code}-${timestamp}-${file.name}`

    const { error } = await supabase.storage
      .from("files")
      .upload(filePath, file)

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json(
        { error: "Upload failed. Try again." },
        { status: 500 }
      )
    }

    const expiresAt = new Date(
      Date.now() + EXPIRES_IN_HOURS * 60 * 60 * 1000
    ).toISOString()

    const { error: dbError } = await supabase
      .from("uploads")
      .insert([
        {
          code,
          file_path: filePath,
          original_name: file.name,
          mime_type: detectedMime,
          uploaded_at: new Date().toISOString(),
          expires_at: expiresAt,
          password_hash: passwordHash,
        },
      ])

    if (dbError) {
      console.error("Database insert error:", dbError)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json(
      { error: "Server error. Try again later." },
      { status: 500 }
    )
  }
}
