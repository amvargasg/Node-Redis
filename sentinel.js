const sentinel = require('redis-sentinel');
 
// List the sentinel endpoints
const endpoints = [
    {port: 6379, host: 'redis.integracion.svc.cluster.local', password:'admin'}, //redis cluster
    {port: 5000, host: 'redis-sentinel.integracion.svc.cluster.local', password:'admin'}
];
 
const opts = {}; // Standard node_redis client options
const masterName = 'mymaster';
 
// masterName and opts are optional - masterName defaults to 'mymaster'
const redisClient = sentinel.createClient(endpoints, masterName, opts);



redisClient.on("connect", function() {
    console.log("Connected");
    console.log(auth_pass);
  });

  redisClient.on('error', err => {       
    global.console.log(err.message)
}); 

module.exports = {
    client : redisClient
};

// The master is the default case if no role is specified.
//const masterClient = sentinel.createClient(endpoints, masterName, {role: 'master'}); 
//const slaveClient = sentinel.createClient(endpoints, masterName, {role: 'slave'});
//const sentinelClient = sentinel.createClient(endpoints, {role: 'sentinel'});