const { isValidObjectId } = require("mongoose");

/**
 * 
 */
const ProductSocket = {};

ProductSocket.bidding = (io) => {
    io.on('connection', (socket) => {
        socket.on("bidding-products", (data) => {
            console.log(data);
        })
    })
}

export default ProductSocket;
