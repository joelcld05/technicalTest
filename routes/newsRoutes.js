const express = require('express')
const router = express.Router();
const {getNews, postNew, getOneNew,putNew,getFavoriteNews} = require('../controllers/newsController');


router.route('/news').get(getNews).post(postNew);
router.route('/news/:id').get(getOneNew).post(putNew);
router.route('/news/favorite').get(getFavoriteNews)
module.exports = router;