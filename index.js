const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('message', (msg) => {
		console.log(`message: ${msg}`);
		io.emit('message', msg);
	});

	socket.on('add user', (user) => {
		console.log("user added: " + user);
		io.emit('message', user + " joined the chat");
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
		io.emit('message', 'user disconnected');
	})
})