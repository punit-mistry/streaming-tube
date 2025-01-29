import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const streamKey = formData.get("streamKey") as string;

  if (!file || !streamKey) {
    return NextResponse.json(
      { error: "Missing file or stream key" },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();

  try {
    const response = await fetch(
      `https://live.mux.com/v1/stream-key/${streamKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "video/webm",
        },
        body: buffer,
        // duplex: "half", // Required for streaming requests
      }
    );

    if (!response.ok) {
      throw new Error(
        `Mux API responded with ${response.status}: ${await response.text()}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending chunk to Mux:", error);
    return NextResponse.json(
      { error: "Failed to send chunk to Mux" },
      { status: 500 }
    );
  }
}