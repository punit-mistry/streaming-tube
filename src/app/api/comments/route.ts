import { NextResponse } from "next/server"

export const runtime = "edge"

let clients: ReadableStreamDefaultController[] = []

function sendCommentToAll(comment: string) {
  clients.forEach((client) => {
    client.enqueue(`data: ${JSON.stringify({ comment })}\n\n`)
  })
}

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.push(controller)
    },
    cancel() {
      clients = clients.filter((client) => client !== controller)
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

export async function POST(request: Request) {
  const { text } = await request.json()

  const comment = {
    id: Date.now().toString(),
    text,
    username: "Anonymous", // You can implement user authentication to get real usernames
  }

  sendCommentToAll(JSON.stringify(comment))

  return NextResponse.json({ message: "Comment sent" })
}

