const redis = require("redis");

const connection = 
{ 
    port      : 6379,                 // replace with your port
    host      : 'redis.integracion.svc.cluster.local',      // replace with your hostanme or IP address
    password  : 'admin'
} ;

const client = redis.createClient(connection);

client.on("connect", function() {
       console.log("You are now connected");
     });


module.exports = {
      client: client
  };
