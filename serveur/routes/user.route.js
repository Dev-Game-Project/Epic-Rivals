const router = require('express').Router();
const userController = require('../controllers/user.controller');
// register a new user
router.post('/register', userController.createUser);

//get all users
router.get('/all', userController.getAllUsers);

module.exports = router;
