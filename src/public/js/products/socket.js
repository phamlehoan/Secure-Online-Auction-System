let socket = io();

let onBiddingProduct = (productId) => {
    let price = document.getElementById(productId).textContent;
    let newPrice = document.getElementById('input-price' + productId);

    if (window.location.pathname === '/products/'+productId) {
        newPrice = parseInt(newPrice.value);
        if (parseInt(price) >= parseInt(newPrice.value)) {
            alert('You must provide a higher than current price');
            return;
        }
        return biddingProduct(productId, newPrice);
    }

    if (window.location.pathname.startsWith('/products')) {
        let priceStep = newPrice.step;
        newPrice = parseInt(price) + parseInt(priceStep);
        if (parseInt(price) >= parseInt(newPrice.value)) {
            alert('You must provide a higher than current price');
            return;
        }
    }

    return biddingProduct(productId, newPrice);
    
}

/**
 * Send params to the server
 * 
 * @param {String} productId
 * @param {String} price
 */
let biddingProduct = async (productId, newPrice) => {
    await socket.emit("req-product-bidding", {
        productId,
        newPrice
    });
}

socket.on("res-product-bidding-price", (data) => {
    let price = document.getElementById(data.productId);
    price.classList.remove('text-danger');
    price.classList.add('text-success');
    //details page
    let inputPrice = document.getElementById('input-price' + data.productId);
    if (inputPrice) {
        inputPrice.value = parseInt(data.price) + parseInt(data.priceStep);
        inputPrice.min = data.price;
    }
    anime({
        targets: price,
        innerHTML: [0, data.price],
        easing: 'linear',
        round: 10
    });
})
