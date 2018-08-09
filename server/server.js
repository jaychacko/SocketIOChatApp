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
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected connected')
    })
})


app.use(express.static(publicPath))

// app.listen(port, () => {
//     console.log("server opened at: "+ port)
// });
server.listen(port, () => {
    console.log("server opened at: " + port)
});