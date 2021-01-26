# How to run RabbitMQ with Node.JS

Full example of the code snippets at https://www.cloudamqp.com/blog/2020-09-21-how-to-run-rabbitmq-with-nodejs.html.

```bash
npm install
node app.js
```

Using your CloudAMQP address:

```bash
CLOUDAMQP_URL=amqps://user:password@host/user node app.js
```

You need to edit the `url` in config.json for Rascal.
