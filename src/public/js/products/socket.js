let socket = io();


/**
 * Send params to the server
 * 
 * @param {String} productId
 * @param {String} price
 */
let biddingProduct = (productId, newPrice) => {
    let product = fetch('http://localhost:8080/api/v1/products/'+productId)
    .then(data => data.json());
    document.getElementById(productId).innerHTML = product.price;


    socket.emit("req-product-bidding", {
        productId,
        newPrice
    });

    return socket.on("res-product-bidding-price", (data) => {
        document.getElementById(data.productId).innerHTML = "$ "+  data.price;
        document.getElementById("number-product-bidding").innerHTML = data.biddingCount;
        window.location.href = 'http://localhost:8080/products/'+data.productId
    })
}

