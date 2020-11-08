import ProductService from "../services/product.service";
import ProductUtils from "../utils/product.util";

const ProductApi = {};

ProductApi.getProducts = async (req, res) => {
    res.json({
        products : await ProductService.findAll()
    })
}

export default ProductApi;
