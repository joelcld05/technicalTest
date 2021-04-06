const express = require('express')
const router = express.Router();
const { getNews, postNew, postNewFavorite,deleteNew,
        getOneNew,putNew,getFavoriteNews,getCreateNew
    } = require('../controllers/newsController');

router.route('/news').get(getNews).post(postNew);
router.route('/news/create').get(getCreateNew);
router.route('/news/favorite').get(getFavoriteNews);
router.route('/news/edit/:id').get(getOneNew);
router.route('/news/delete/:id').get(deleteNew);
router.route('/news/favorite/:id').get(postNewFavorite);

router.route('/news/:id').get(getOneNew).post(putNew);

module.exports = router;