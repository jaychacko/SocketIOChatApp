var socket = io();

socket.on('connect', function () {
    console.log('connected to server')

    socket.on('AMessage', (userinfo) => {
        console.log('user info is ', userinfo);
    })

    
});

socket.on('disconnect', function () {
    console.log('sever got disconnected')
});


socket.on('userAdded', function (msg) {
        console.log('New Msg', msg)
    }

)


//ui