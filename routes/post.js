const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controller/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete/:id',passport.checkAuthentication,postController.deletePost);
module.exports = router;