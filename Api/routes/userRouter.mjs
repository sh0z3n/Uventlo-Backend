import express from 'express';
import morgan from 'morgan' ;
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  desactivateUser,
  logoutUser
} from '../controllers/userController.mjs';
import { authMiddleware , isAdmin , googleAuth } from '../middlewares/authMiddleware.mjs';


const router = express.Router();

// @desc Get all users
// @route GET /api/v1/users
// @access Admin
router.get('/list' , getAllUsers);  // done

// @desc Get a specific user
// @route GET /api/v1/users/:id
// @access public
router.get('/:id',  getUserById ); //done 

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
router.post('/register', registerUser); // done

// @desc Login a user
// @route POST /api/v1/auth/login
// @access Public
router.post('/login', loginUser); // done


// @desc Update a user
// @route PUT /api/v1/users/:id
// @access private
router.put('/:id',  updateUser); //done

// @desc Partially update a user
// @route PATCH /api/v1/users/:id
// @access private
router.patch('/:id',  updateUser);//done

// @desc Delete a user
// @route DELETE /api/v1/users/:id
// @access private 
router.delete('/:id' ,deleteUser); //done 


//@desc Logout a user
//@route GET /api/v1/auth/logout
//@access Private

router.get('/logout', logoutUser);


// @desc Desactivate a user
// @route DELETE /api/v1/users/:id
// @access private

router.post('/desactivate/:id', desactivateUser , logoutUser); //done



export default router;
