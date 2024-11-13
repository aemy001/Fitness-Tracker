const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); 
const upload = require('../config/multerConfig'); 
const authenticateToken = require('../middleware/authenticateToken');

router.post('/signup', upload.single('profilePicture'), userController.createUser);
router.get('/check-username/:username', userController.checkUsernameUnique);


router.post('/login', userController.loginUser);

router.get('/me', authenticateToken, userController.getUserById);

router.put('/update/:id', authenticateToken, upload.single('profilePicture'), userController.updateUser);

router.get('/:id', userController.getUserById);

router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
