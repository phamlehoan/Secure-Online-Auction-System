import ProductService from "../services/product.service";
import AuctionService from "../services/aution.service";

const ProductApi = {};

ProductApi.getProducts = async (req, res) => {
    return res.json({
        products : await ProductService.findAll()
    })
}

ProductApi.getProduct = async (req, res) => {
    let productId = req.params.id;
    let price = await ProductService.findProductById(productId).nextPrice;
    console.log(price);
    return res.json({
        price
    })
}

ProductApi.getProductAndWinner = async (req, res) => {
    let { id } = req.body;
    let product = await ProductService.findProductById(id);
    let winner = await AuctionService.findHighestPrice(id);
    return res.json({
        product,
        winner
    });
}

ProductApi.postProduct = async (req, res) => {

}

export default ProductApi;
