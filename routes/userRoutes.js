const express = require('express');
const { registerUser, loginUser, getAllUsers, getUser} = require('../Controllers/userController');

// establishing routing By express.Router()
const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/:id', getUser);


module.exports = userRouter;