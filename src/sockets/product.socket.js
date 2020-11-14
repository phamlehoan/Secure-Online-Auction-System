
import AuctionLogModel from "../models/auctionlog.model";
import ProductModel from "../models/product.model";
import ProductService from "../services/product.service";

/**
 * 
 */
const ProductSocket = {};

/**
 * Save bidding log
 * 
 * @param {SocketIo} io
 */
ProductSocket.bidding = (io) => {
    io.on('connection', (socket) => {
        let product = {};
        socket.on("req-product-bidding", async (data) => {
            const productData = await ProductModel.findById(data.productId);
            if (productData) {
                product = {
                    userId: socket.request.user._id,
                    productId: data.productId,
                    price: data.outbidPrice,
                    productImage: productData.image,
                    productName: productData.name
                }
            }

            await ProductService.updatePrice(data.productId, data.outbidPrice);
            await AuctionLogModel.saveProduct(product);
            let counter = await AuctionLogModel.auctionCounter(product.userId);
            return socket.emit("res-product-bidding-price", {
                productId: data.productId, 
                price: data.price,
                biddingCount: counter
            });
        });
    
    })
}



export default ProductSocket;
