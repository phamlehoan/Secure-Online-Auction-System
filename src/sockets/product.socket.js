
import AuctionLogModel from "../models/auctionlog.model";
import ProductModel from "../models/product.model";
import ProductService from "../services/product.service";
import { ProductNotFoundException } from "../exceptions/product.exception";

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
            if (!productData) {
                throw new ProductNotFoundException('Product not found');
            }

            product = {
                userId: socket.request.user._id,
                productId: data.productId,
                price: data.newPrice,
                productImage: productData.image,
                productName: productData.name,
                priceStep: productData.priceStep
            }

            await ProductService.updatePrice(data.productId, data.newPrice);
            await AuctionLogModel.saveProduct(product);
            let counter = await AuctionLogModel.auctionCounter(product.userId);
            return io.emit("res-product-bidding-price", {
                productId: data.productId, 
                price: data.newPrice,
                biddingCount: counter,
                priceStep: product.priceStep,
                nextPrice: parseInt(data.newPrice) + parseInt(product.priceStep)
            });
        });
    
    })
}



export default ProductSocket;