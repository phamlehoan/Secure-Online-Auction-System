import ProductSocket from "../sockets/product.socket";

/**
 * 
 * @param {Socket.io} io 
 */
let socketInitials = (io) => {
    ProductSocket.bidding(io);
}

module.exports = socketInitials;
