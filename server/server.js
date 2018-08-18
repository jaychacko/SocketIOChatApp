const path = require('path')
const express = require('express');
const socketIo = require('socket.io')
const http = require('http');
const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')

const app = express();
const port = process.env.PORT || 5000


var server = http.createServer(app);

var io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New connected');

    socket.emit('newMessage',generateMessage('Admin','welcome to chat app'))

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user added'))
    
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message)
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('This is from server');
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