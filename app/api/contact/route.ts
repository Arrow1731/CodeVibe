import { type NextRequest, NextResponse } from "next/server"
import { sendToTelegram } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send to Telegram
    await sendToTelegram(formData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
