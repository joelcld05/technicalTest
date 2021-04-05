const express = require('express')
const router = express.Router();
const {getProfile,getRegister,postRegister} = require('../controllers/userController');


router.route('/userprofile').get(getProfile);
router.route('/register').get(getRegister).post(postRegister);



module.exports = router;