# Use CloudAMQP from Node.js

A minimal example of publishing and consuming messages with
[amqp-client.js](https://github.com/cloudamqp/amqp-client.js), against
[CloudAMQP](https://www.cloudamqp.com) or any AMQP 0-9-1 broker such as
[LavinMQ](https://lavinmq.com) or RabbitMQ.

- [`publisher.js`](publisher.js) publishes a persistent message and waits for the broker's confirm.
- [`worker.js`](worker.js) consumes with a prefetch of 10, acking each message when the callback returns.
- [`amqp.js`](amqp.js) connects using the `CLOUDAMQP_URL` environment variable, and reconnects automatically.

## Usage

Tool versions are in `mise.toml`; install them with [mise](https://mise.jdx.dev),
or use Node.js 24.2+.

```sh
npm install
export CLOUDAMQP_URL="amqps://user:password@host/vhost"
node worker.js      # in one terminal
node publisher.js   # in another
```

Without `CLOUDAMQP_URL` it connects to `amqp://guest:guest@localhost`.

## Tests

`npm test` publishes and consumes a message through a real broker on
localhost. CI runs it against LavinMQ.
