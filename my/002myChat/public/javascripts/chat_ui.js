/**
 * Created by root on 8/13/14.
 */
debugger;
function divSystemContentElement(message){
    return $('<div></div>').text(message);
}

function divEscapedContentElement(message){
    return $('<div></div>').html('<i>'+message+'</i>');
    /**
     * <i> 标签显示斜体文本效果。

     <i> 标签和基于内容的样式标签 <em> 类似。它告诉浏览器将包含其中的文本以斜体字（italic）或者倾斜（oblique）字体显示。
     如果这种斜体字对该浏览器不可用的话，可以使用高亮、反白或加下划线等样式。

     提示：<i> 标签一定要和结束标签 </i> 结合起来使用。
     */
}

function processUserInput(chatApp,socket){
    var message = $('#message').val();
    var systemMessage;

    if(message.charAt(0)=='/'){
        systemMessage = chatApp.processCommand(message);
        if(systemMessage){
            $('#message').append(divSystemContentElement(systemMessage));
        }
    }else{
        chatApp.sendMessage($('#room').text(),message);
        $('#message').append(divEscapedContentElement(systemMessage));
        $('#message').scrollTop($('#message').prop('scrollHeigth'));
        //prop('scrollHeigth')获取它的高度
        //scrollTop滚动条相对于其顶部的偏移。
    }

    $('#message').val('');
}

var socket = io.connect;

$(document).ready(function(){
    var chatApp = new Chat(socket);

    socket.on('nameResult',function(result){

        var message ;

        if(result.success){
            message ='You are now known as '+result.name+'.';
        }else{
            message = result.message;
        }

        $('#message').append(divSystemContentElement(message));
    });

    socket.join('joinResult',function(result){
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('Room changed.'));
    });

    socket.on('message',function(message){
        var newElement = $('<div></div>').text(message.text);
        $('#message').append(newElement);
    });

    socket.on('rooms',function(rooms){
        $('#room-list').empty();

        for(var room in rooms){
            room = rooms.substring(1,room.length);
            if(room!=''){
                $('#room-list').append(divEscapedContentElement(room))
            }
        }
    });

    $('#room-list div').click(function(){
        chatApp.processCommand('/join'+$(this).text());
        $('#send-message').focus();
    });

    setInterval(function (){
        socket.emit('rooms');
    },1000);

    $('#send-message').focus();

    $('#send-form').submit(function(){
        processUserInput(chatApp,socket);
        return false;
    });

});