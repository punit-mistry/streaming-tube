"use server"

import Mux from "@mux/mux-node"

const clientVideo = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})
interface LiveStreamCreateParams {
  title: string;
  description: string;
  playback_policy?: string;
  new_asset_settings?: {
    playback_policy?: string;
  };
}
export async function createStream() {
  try {
    const body:LiveStreamCreateParams = {
        title: 'My Stream',
        description: 'A live stream',
        playback_policy: "public",
        new_asset_settings: {
          "playback_policy": "public"
        }
      };
    const stream = await clientVideo.video.liveStreams.create(body)
    console.log(stream,"stream")
    return {
      streamKey: stream.stream_key,
      playbackId: stream.playback_ids?.[0]?.id,
    }
  } catch (error) {
    console.error("Error creating stream:", error)
    throw new Error("Failed to create stream")
  }
}