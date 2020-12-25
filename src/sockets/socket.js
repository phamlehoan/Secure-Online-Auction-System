import ProductSocket from "../sockets/product.socket";

/**
 * 
 * @param {Socket.io} io 
 */
let socketInitials = (io) => {
    ProductSocket.bidding(io);
    ProductSocket.onJoinRoom(io);
}

module.exports = socketInitials;
