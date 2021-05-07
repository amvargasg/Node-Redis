const redis = require("redis");

const connection = 
{ 
    port      : 5000,                 // replace with your port
    host      : 'redis-cluster',        // replace with your hostanme or IP address
} ;

const client = redis.createClient(connection);

client.on("connect", function() {
       console.log("You are now connected");
     });


module.exports = {
      client: client
  };
