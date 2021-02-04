# amqp-coffee

Example using [amqp-coffee](https://github.com/dropbox/amqp-coffee).

* Install CoffeeScript

      npm install --global coffeescript

* Install the dependencies

      npm install

* Run it with the defaults (uses locahost)

      coffee index.coffee

* Run it with custom configuration

      AMQP_HOST=server.example.com AMQP_USER=foo AMQP_PASS=bar coffee index.coffee
