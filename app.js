var amqp = require('amqp');

function pub_and_sub() {
  var exchange = conn.exchange('');
  var queue = conn.queue('queue1', {}, function() {
    queue.subscribe(function(msg) {
      console.log(msg.body);
    });
    exchange.publish(queue.name, {body: 'Hello CloudAMQP!'});
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url});
conn.on('ready', pub_and_sub);
