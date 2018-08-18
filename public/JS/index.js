var socket = io();

socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('disconnect', function () {
    console.log('sever got disconnected')
});


    socket.on('newMessage', function (msg) {
        console.log('New Msg', msg)

        var li = $('<li></li>');
        li.text(`${msg.from}: ${msg.text}`);
        $('#messages').append(li)
    })

 

//ui

$('#message-form').on('submit',function(e){
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text: $('[name=message]').val()
    }, function (){
        //console.log('got it',data);
    })
})

