var amqp = require('amqp'); 

function pub_and_sub() {
  var x = conn.exchange('');
  var queue = conn.queue('', {}, function(q) { // create a queue
    console.log(q.name);
    q.subscribe({ ack: false }, function(msg, headers, deliveryInfo, messageObject) { // subscribe to that queue
      //console.log(msg.body); // print new messages to the console
      //messageObject.acknowledge(false);
    });

    for (var i = 0; i < 100000; i++) {
      x.publish(q.name, { body: 'Hello CloudAMQP!' }); 
    }
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://localhost"; // default to localhost
var implOpts = {
  reconnect: true,
  reconnectBackoffStrategy: 'linear', // or 'exponential'
  reconnectBackoffTime: 500, // ms
};
var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
conn.on('ready', pub_and_sub); // when connected, call "pub_and_sub"
