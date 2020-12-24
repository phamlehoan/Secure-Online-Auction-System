import ProductSocket from "../sockets/product.socket";

/**
 * 
 * @param {Socket.io} io 
 */
let socketInitials = (io) => {

    io.on('connection', (socket) => {
        console.log(socket.request.user._id, 'is connected');
    });

    /********************************/
    ProductSocket.bidding(io);
    ProductSocket.onJoinRoom(io);

}

module.exports = socketInitials;
