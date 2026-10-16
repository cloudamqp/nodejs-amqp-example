import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { test } from "node:test"
import { connect } from "../amqp.ts"
import { publish } from "../publisher.ts"
import { consume } from "../worker.ts"

test("worker receives published message", async () => {
  const queue = `roundtrip-${randomUUID()}`
  const session = await connect()
  try {
    const received = new Promise<string>((resolve) => consume(session, queue, resolve))
    await publish(session, queue, "Hello CloudAMQP!")
    assert.equal(await received, "Hello CloudAMQP!")
  } finally {
    await (await session.queue(queue)).delete()
    await session.stop()
  }
})
