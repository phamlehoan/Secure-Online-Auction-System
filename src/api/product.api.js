import ProductService from "../services/product.service";

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

ProductApi.postProduct = async (req, res) => {

}

export default ProductApi;
