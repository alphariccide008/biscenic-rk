import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messageId, rating } = await req.json()

    if (!messageId || !rating) {
      return NextResponse.json({ error: "Message ID and rating are required" }, { status: 400 })
    }

    // In a real application, you would save this feedback to a database
    console.log(`Received feedback for message ${messageId}: ${rating}`)

    return NextResponse.json({ status: "success", message: "Feedback received" })
  } catch (error) {
    console.error("Error sending feedback:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
