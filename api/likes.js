const likeController = require('../controllers/likes');
const express = require('express');
const router = express.Router();

router.post('/addLike' , likeController.addLike);
router.get('/all' , likeController.findAllLike);
router.get('/:id' , likeController.findLikeId);
router.put('/:id', likeController.editAll);
router.patch('/:id', likeController.editSomeone);
router.delete('/:id' , likeController.remove);

module.exports = router;