const express = require('express')
const router = express.Router();
const {Home,getLogin,postLogin,logout} = require('../controllers/authController');


router.route('/').get(Home);
router.route('/login').get(getLogin).post(postLogin);
router.route('/logout').all(logout);


module.exports = router;