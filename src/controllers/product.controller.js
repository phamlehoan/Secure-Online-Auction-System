/**
 * controller home page
 */
const ProductController = {};

ProductController.getListProduct = (req, res, next) => {
    res.render('Product/listProduct', { title: 'SOAS. - List Products' });
}

ProductController.getListDetails = (req, res, next) => {
    res.render('Product/productDetails', { title: 'SOAS. - Product Details' });
}

ProductController.getCart = (req, res, next) => {
    res.render('Product/cart', { title: 'SOAS. - Cart' });
}

ProductController.winningProduct = (req, res, next) => {
    res.render('Product/winningProduct', { title: 'SOAS. - Winning Products' });
}

export default ProductController;