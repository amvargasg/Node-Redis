const redis = require("redis");

const connection = 
{ 
    port      : 6379,                 // replace with your port
    host      : '172.21.29.158',        // replace with your hostanme or IP address
} ;

const client = redis.createClient(connection);

client.on("connect", function() {
       console.log("You are now connected");
     });


module.exports = {
      client: client
  };
