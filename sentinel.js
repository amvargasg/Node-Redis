const sentinel = require('redis-sentinel');
 
// List the sentinel endpoints
const endpoints = [
    {host: 'redis-cluster', port: 6379},
    {host: 'redis-sentinel', port: 5000}
   // {host: 'redis-sentinel', port:'redis.integracion.svc.cluster.local'}
];
 
const opts = {}; // Standard node_redis client options
const masterName = 'mymaster';
 
// masterName and opts are optional - masterName defaults to 'mymaster'
const redisClient = sentinel.createClient(endpoints, masterName, opts);

redisClient.on("connect", function() {
    console.log("You are now connected");
  });


module.exports = {
    client : redisClient
};

// The master is the default case if no role is specified.
//const masterClient = sentinel.createClient(endpoints, masterName, {role: 'master'}); 
//const slaveClient = sentinel.createClient(endpoints, masterName, {role: 'slave'});
//const sentinelClient = sentinel.createClient(endpoints, {role: 'sentinel'});