import ProductService from "../services/product.service";

const ProductApi = {};

ProductApi.getProducts = async (req, res) => {
    res.json({
        products : await ProductService.findAll()
    })
}

export default ProductApi;
