var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SOAS. - HomePage' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('Account/login', { title: 'SOAS. - Login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('Account/register', { title: 'SOAS. - Register' });
});

/* GET change password page. */
router.get('/change-password', function(req, res, next) {
  res.render('Account/changePassword', { title: 'SOAS. - Change Password' });
});

module.exports = router;
