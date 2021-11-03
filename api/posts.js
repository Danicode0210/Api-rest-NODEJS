const postController = require('../controllers/posts');
const express = require('express');
const router = express.Router();

router.post('/addPost' , postController.addPost);
router.get('/all' , postController.findAllPost);
router.get('/:id' , postController.findPostId);
router.patch('/:id', postController.editAll)
router.delete('/:id' , postController.remove);

module.exports = router;