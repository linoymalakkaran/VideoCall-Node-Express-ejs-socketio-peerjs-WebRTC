//not using -- only for cloud hosting
var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: process.env.PORT, path: '/'});