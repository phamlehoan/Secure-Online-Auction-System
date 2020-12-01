import ProductService from "../services/product.service";

const ProductApi = {};

ProductApi.getProducts = async (req, res) => {
    return res.json({
        products : await ProductService.findAll()
    })
}

ProductApi.getProduct = async (req, res) => {
    let productId = req.params.id;
    return res.json({
        product: await ProductService.findProductById(productId)
    })
}

ProductApi.postProduct = async (req, res) => {

}

export default ProductApi;
