import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: openai("gpt-4o"),
      messages,
    })

    return result.to
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
