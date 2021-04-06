const express = require('express')
const router = express.Router();
const { getNews, postNew, postNewFavorite, deleteNew,
    getOneNew, putNew, getFavoriteNews, getCreateNew,
    deleteNewFavorite, getUpdateNew
} = require('../controllers/newsController');

router.route('/news').get(getNews).post(postNew);
router.route('/news/create').get(getCreateNew);
router.route('/news/edit/:id').get(getUpdateNew).post(putNew);
router.route('/news/delete/:id').get(deleteNew);

router.route('/news/favorite').get(getFavoriteNews);
router.route('/news/favorite/:id').get(postNewFavorite);
router.route('/news/favorite/delete/:id').get(deleteNewFavorite);

router.route('/news/:id').get(getOneNew);

module.exports = router;