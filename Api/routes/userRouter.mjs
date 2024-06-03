import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  desactivateUser,
  logoutUser,
  updateProfilePicture
} from '../controllers/userController.mjs';
import { authMiddleware , isAdmin  } from '../middlewares/authMiddleware.mjs';


const router = express.Router();

// @desc Get all users
// @route GET /api/v1/users
// @access Admin
router.get('/list' , getAllUsers);  // done

// @desc Get a specific user
// @route GET /api/v1/users/:id
// @access public
router.get('/:id',  getUserById ); //done 

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


// @desc Desactivate a user
// @route DELETE /api/v1/users/:id
// @access private

router.post('/desactivate/:id', desactivateUser , logoutUser); //done

//@desc Updating the user 's pic 
//@router put /user/id/....
//@acess private 

router.route('/:id/profile-picture').put(updateProfilePicture);


export default router;
