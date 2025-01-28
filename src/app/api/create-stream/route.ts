import { NextResponse } from "next/server"
import { createStream } from "@/app/actions/createStreams"

export async function POST() {
  try {
    const { streamKey, playbackId } = await createStream()
    return NextResponse.json({ streamKey, playbackId })
  } catch (error) {
    console.error("Error in create-stream route:", error)
    return NextResponse.json({ error: "Failed to create stream" }, { status: 500 })
  }
}

