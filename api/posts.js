const postController = require('../controllers/posts');
const express = require('express');
const router = express.Router();

router.post('/addPost' , postController.addPost);
router.get('/all' , postController.findAllPost);
router.get('/:id' , postController.findPostId);
router.put('/:id', postController.editAll);
router.patch('/:id', postController.editSomeone);
router.delete('/:id' , postController.remove);

module.exports = router;