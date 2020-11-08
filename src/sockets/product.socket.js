
/**
 * 
 */
const ProductSocket = {};

ProductSocket.bidding = (io) => {
    io.on('connection', (socket) => {
        socket.on("bidding-products", (data) => {
            console.log(data);
            console.log(req.user);
        })
    });

    //io.emit("res-bidding-products", products);
}

export default ProductSocket;
