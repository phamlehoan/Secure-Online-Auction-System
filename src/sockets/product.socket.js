
/**
 * 
 */
const ProductSocket = {};

ProductSocket.bidding = (io) => {
    // io.on('connection', (socket) => {
    //     socket.on("bidding-products", (data) => {
    //         console.log(data);
    //         console.log(req.user);
    //     })
    // });
    io.on("connection",(socket)=>{
        socket.on("hello",(data)=>{
            console.log(data.data);
        });
      })

    //io.emit("res-bidding-products", products);
}

export default ProductSocket;
