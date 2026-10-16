import type { AMQPSession } from "@cloudamqp/amqp-client"
import { connect } from "./amqp.ts"

// Resolves once the broker has confirmed the message
export async function publish(session: AMQPSession, queueName: string, message: string) {
  const queue = await session.queue(queueName, { durable: true })
  await queue.publish(message, { deliveryMode: 2 })
  console.log(` [x] Sent '${message}'`)
}

if (import.meta.main) {
  const session = await connect()
  await publish(session, "hello", "Hello CloudAMQP!")
  await session.stop()
}
