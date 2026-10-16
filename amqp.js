import { AMQPSession } from "@cloudamqp/amqp-client"

// The session reconnects automatically and recovers consumers
export function connect() {
  return AMQPSession.connect(process.env.CLOUDAMQP_URL || "amqp://guest:guest@localhost")
}
