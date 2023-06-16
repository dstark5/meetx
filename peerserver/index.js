const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

const server = app.listen(process.env.PORT||3001,()=>{
  console.log("PeerServer started port"+process.env.PORT)
});

const peerServer = ExpressPeerServer(server, {
  path: '/app'
});


app.use('/peerjs', peerServer)


peerServer.on('connection', (c) => {  
  console.log(c.id)
});

peerServer.on('disconnect', (c) => { 
  console.log(c.id) 
});