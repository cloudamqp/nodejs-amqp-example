import type { AMQPSession } from "@cloudamqp/amqp-client"
import { connect } from "./amqp.ts"

// The message is acked when the callback returns, and requeued if it throws
export async function consume(
  session: AMQPSession,
  queueName: string,
  handler: (message: string) => void | Promise<void>,
) {
  const queue = await session.queue(queueName, { durable: true })
  return queue.subscribe({ prefetch: 10 }, async (msg) => {
    await handler(msg.bodyString() ?? "")
  })
}

if (import.meta.main) {
  const session = await connect()
  await consume(session, "hello", (message) => console.log(` [x] Received '${message}'`))
  console.log(" [*] Waiting for messages. To exit press CTRL+C")
  process.on("SIGINT", async () => {
    await session.stop()
  })
}
