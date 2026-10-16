import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { test } from "node:test"
import { connect } from "../amqp.js"
import { publish } from "../publisher.js"
import { consume } from "../worker.js"

test("worker receives published message", async () => {
  const queue = `roundtrip-${randomUUID()}`
  const session = await connect()
  try {
    const received = new Promise((resolve) => consume(session, queue, resolve))
    await publish(session, queue, "Hello CloudAMQP!")
    assert.equal(await received, "Hello CloudAMQP!")
  } finally {
    await (await session.queue(queue)).delete()
    await session.stop()
  }
})
