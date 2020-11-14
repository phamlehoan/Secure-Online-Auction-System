let socket = io();


/**
 * Send params to the server
 * 
 * @param {String} productId
 * @param {String} price
 */
let biddingProduct = (productId, outbidPrice) => {
    socket.emit("req-product-bidding", {
        productId,
        outbidPrice
    });

    return socket.on("res-product-bidding-price", (data) => {
        document.getElementById(data.productId).innerHTML = "$ "+  data.price;
        document.getElementById("number-product-bidding").innerHTML = data.biddingCount;
    })
}

