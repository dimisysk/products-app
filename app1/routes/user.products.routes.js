const express = require('express');
const router = express.Router();  // Make sure to call the function

const userProductController = require('../controllers/user.products.controller');  // Check this path

// Ensure the controller function exists and is correctly exported
router.get('/', userProductController.findAll);
router.get('/:username', userProductController.findOne)
router.post('/', userProductController.create);
router.patch('/:username', userProductController.update);
router.delete('/:username/products/:id', userProductController.delete);


module.exports = router;
