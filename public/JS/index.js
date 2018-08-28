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
    });

    socket.on('newLocationMessage',function(message){
        var li = $('<li></li>');
        var a = $('<a target="_blank">My Current Location<a/>')
        li.text(message.from+" : ");
        a.attr('href',message.url);

        li.append(a);
        $('#messages').append(li);
    })

 

//ui

$('#message-form').on('submit',function(e){
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text: $('[name=message]').val()
    }, function (){
        $('[name=message]').val("")
    })
})

var locationBtn = $('#send-location');
locationBtn.on('click',function(e){
if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
}

locationBtn.attr('disabled','disabled').text('Send Location...')

navigator.geolocation.getCurrentPosition(function(position){
    locationBtn.removeAttr('disabled').text('Send Location');

socket.emit('createLocationMsg',{
    lat:position.coords.latitude,
    long:position.coords.longitude
});


},function(){
    locationBtn.removeAttr('disabled');
    alert('unable to fetch location')
})
})


