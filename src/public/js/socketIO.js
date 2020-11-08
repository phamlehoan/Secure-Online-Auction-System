let socket = io();

let jwt = sessionStorage.getItem('jwt');

io.connect('http://localhost:8080');
socket.on('connect', () => {
  socket
    .emit('authenticate', { token: jwt }) //send the jwt
    .on('authenticated', () => {
      console.log('IO authenticated');
    })
    .on('unauthorized', (msg) => {
      console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      throw new Error(msg.data.type);
    })
});

let bidding = (productId) => {
    console.log("is bidding ...", productId);
    socket.emit("bidding")
}
