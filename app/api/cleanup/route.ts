import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!


)

export async function GET() {
  try {
    // 1️⃣ Get all expired files
    const { data: expiredFiles, error: fetchError } = await supabase
      .from("uploads")
      .select("*")
      .lt("expires_at", new Date().toISOString())

    if (fetchError) {
      console.error("Failed to fetch expired files:", fetchError)
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 })
    }

    if (!expiredFiles || expiredFiles.length === 0) {
      return NextResponse.json({ success: true, message: "No expired files" })
    }

    // 2️⃣ Delete each file from Supabase storage
    for (const file of expiredFiles) {
      const { error: delError } = await supabase.storage
        .from("files")
        .remove([file.file_path])

      if (delError) {
        console.error("Failed to delete file from storage:", file.file_path, delError)
      }

      // 3️⃣ Remove the record from uploads table
      const { error: dbDelError } = await supabase
        .from("uploads")
        .delete()
        .eq("id", file.id)

      if (dbDelError) {
        console.error("Failed to delete database record:", file.id, dbDelError)
      }
    }

    return NextResponse.json({ success: true, deleted: expiredFiles.length })
  } catch (err: any) {
    console.error("Cleanup server error:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
