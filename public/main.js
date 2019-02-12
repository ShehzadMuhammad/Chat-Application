	$(window).on('load',function(){
        	$('#myModal').modal('show');
    	});

		var userName;
		var msg;
		const socket = io();

		function enterUser() {
			userName = document.getElementById("userName").value;
			socket.emit('add user', userName);
		}

		$("#messageForm").submit(() => {
			msg = $('#m').val();
			socket.emit('message', userName+": " + msg);
			$('#m').val('');
			return false;
		});


		socket.on('connect', () => {
			// emiting to everybody
			socket.emit('message', 'user connected');
		})
		
		socket.on('message', (msg) => {
			$('#messages').append($('<li>').text(msg));
		})