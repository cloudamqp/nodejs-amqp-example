# index.coffee
AMQP = require('amqp-coffee')

# message to publish
msg = "Hello CloudAMQP"

host  = process.env.AMQP_HOST  || "localhost"
port  = process.env.AMQP_PORT  || 5672
vhost = process.env.AMQP_VHOST || "/"
user  = process.env.AMQP_USER  || "guest"
pass  = process.env.AMQP_PASS  || "guest"

# Creates a new amqp Connection.
amqpConnection = new AMQP {host: host, port: port, vhost: vhost, login: user, password: pass}, (e, r)->
  if e?
    console.error "Error", e

  # Returns a channel that can be used to handle (declare, delete etc) queues.
  amqpConnection.queue {queue: "queueName"}, (e,q)->
    q.declare ()->
      q.bind "amq.direct", "queueName", ()->
      amqpConnection.publish "amq.direct", "queueName", msg, {confirm: true}, (err, res)->
      console.log "Message published: " + msg

    consumer = amqpConnection.consume "queueName", {prefetchCount: 2}, (message)->
      console.log("Message consumed: " + message.data.toString())
      message.ack()

    , (e,r)->
      console.log "Consumer setup"
      amqpConnection.publish "amqp.direct", "queueName", "message contents", {deliveryMode:2, confirm:true}, (e, r)->
        if !e? then console.log "Message Sent"
