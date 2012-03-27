var amqp = require('amqp'); 

function pub_and_sub() {
  var exchange = conn.exchange(''); // get the default exchange
  var queue = conn.queue('queue1', {}, function() { // create a queue
    queue.subscribe(function(msg) { // subscribe to that queue
      console.log(msg.body); // print new messages to the console
    });

    // publish a message
    exchange.publish(queue.name, {body: 'Hello CloudAMQP!'}); 
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://localhost"; // default to localhost
var conn = amqp.createConnection({url: url}); // create the connection
conn.on('ready', pub_and_sub); // when connected, call "pub_and_sub"
