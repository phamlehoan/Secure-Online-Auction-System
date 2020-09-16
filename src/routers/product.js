var express = require('express');
var router = express.Router();

/* GET list products page. */
router.get('/', function(req, res, next) {
  res.render('Product/listProduct', { title: 'SOAS. - List Products' });
});

/* GET product details page. */
router.get('/details', function(req, res, next) {
  res.render('Product/productDetails', { title: 'SOAS. - Product Details' });
});

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('Product/cart', { title: 'SOAS. - Cart' });
});

/* GET winning product page. */
router.get('/winning-product', function(req, res, next) {
  res.render('Product/winningProduct', { title: 'SOAS. - Winning Products' });
});

module.exports = router;