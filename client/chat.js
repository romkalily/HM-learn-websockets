var socket = io('http://localhost:3000');

/////////////////////MESSAGES
const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
    socket.emit('message', { data: message.value });
}

socket.on('message', ({ data }) => {
    handleNewMessage(data);
})

const handleNewMessage = (message) => {
    messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    return li;
}

/////////////////////TYPING
const handleKeyPress = () => {
    socket.emit('typing');
}

socket.on('typing', () => {
    const typing = document.getElementById('typing');
    typing.style.display = 'block';
    setTimeout(() => {
        typing.style.display = 'none';
    }, 3000)
    return typing;
})

/////////////////////CONNECTED

const handleConnect = () => {
    socket.emit('connect');
}

socket.on('connect', () => {
    socket.emit('message', { data: `${socket.id} connected` })
})

const handleDisconnect = () => {
    socket.emit('disconnect');
}

socket.on('disconnect', () => {
    socket.emit('message', { data: `${socket.id} disconnected` })
    socket = undefined;
    document.getElementById('chat').style.display = 'none';
})
