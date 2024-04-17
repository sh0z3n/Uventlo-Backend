import express from 'express';
import morgan from 'morgan' ;
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.mjs';

import {isAdmin} from '../middlewares/isAdmin.mjs';

import { authMiddleware } from '../middlewares/authMiddleware.mjs';


const router = express.Router();

// @desc Get all users
// @route GET /api/v1/users
// @access Admin
router.get('/list',  getAllUsers);  // done

// @desc Get a specific user
// @route GET /api/v1/users/:id
// @access public
router.get('/:name',  getUserById ); //done 

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
router.post('/register', registerUser); // done

// @desc Login a user
// @route POST /api/v1/auth/login
// @access Public
router.post('/login', loginUser); // done

//@desc Logout a user
//@route GET /api/v1/auth/logout
//@access Private

router.get('/logout', (req, res) => {   // not yet fixed , i will add in controlllers ky nkml auth 
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});


// @desc Update a user
// @route PUT /api/v1/users/:id
// @access private
router.put('/:name',  updateUser); //done

// @desc Partially update a user
// @route PATCH /api/v1/users/:id
// @access private
router.patch('/:name',  updateUser);//done

// @desc Delete a user
// @route DELETE /api/v1/users/:id
// @access private 
router.delete('/delete/:name' ,deleteUser); //done 

export default router;
