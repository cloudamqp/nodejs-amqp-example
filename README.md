# Use CloudAMQP from TypeScript

A minimal TypeScript example of publishing and consuming messages with
[amqp-client.js](https://github.com/cloudamqp/amqp-client.js), against
[CloudAMQP](https://www.cloudamqp.com) or any AMQP 0-9-1 broker such as
[LavinMQ](https://lavinmq.com) or RabbitMQ.

- [`publisher.ts`](publisher.ts) publishes a persistent message and waits for the broker's confirm.
- [`worker.ts`](worker.ts) consumes with a prefetch of 10, acking each message when the callback returns.
- [`amqp.ts`](amqp.ts) connects using the `CLOUDAMQP_URL` environment variable, and reconnects automatically.

## Usage

Tool versions are in `mise.toml`; install them with [mise](https://mise.jdx.dev),
or use Node.js 24.2+, which runs `.ts` files directly without a build step.

```sh
npm install
export CLOUDAMQP_URL="amqps://user:password@host/vhost"
node worker.ts      # in one terminal
node publisher.ts   # in another
```

Without `CLOUDAMQP_URL` it connects to `amqp://guest:guest@localhost`.

## Tests

`npm test` publishes and consumes a message through a real broker on
localhost, and `npm run typecheck` type-checks the code with `tsc`. CI runs
both, the test against LavinMQ.
