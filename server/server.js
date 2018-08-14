const path = require('path')
const express = require('express');
const socketIo = require('socket.io')
const http = require('http');

const publicPath = path.join(__dirname, '../public')

const app = express();
const port = process.env.PORT || 5000


var server = http.createServer(app);

var io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New connected');

    socket.emit('AMessage',{
        from:'Admin',
        text:"welcome to chat app",
        createdAt:new Date().getTime()
    })

    
        socket.broadcast.emit('userAdded',{
            from:'Admin',
            text:'New user added',
            createdAt:new Date().getTime()
        })


    socket.on('disconnect', () => {
        console.log('user disconnected connected')
    })
})
//server


app.use(express.static(publicPath))

// app.listen(port, () => {
//     console.log("server opened at: "+ port)
// });
server.listen(port, () => {
    console.log("server opened at: " + port)
});