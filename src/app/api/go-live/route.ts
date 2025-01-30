import { NextResponse } from "next/server"
import Mux from "@mux/mux-node"

const muxClient = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!
  })
export async function POST() {
  try {
    const liveStream = await muxClient.video.liveStreams.create({
      playback_policy: ["public"],
      new_asset_settings: { playback_policy: ["public"] },
    })
    const playbackIds = liveStream?.playback_ids || []
    return NextResponse.json({
      streamKey: liveStream.stream_key,
      playbackId: playbackIds.length > 0 ? playbackIds[0].id : null,
    })
  } catch (error) {
    console.error("Error creating live stream:", error)
  }
}

