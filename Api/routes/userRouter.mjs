import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  desactivateUser,
  logoutUser,
  getContact,
  getContacts,
  addContact,
  updateProfilePicture
} from '../controllers/userController.mjs';
import { authMiddleware , isAdmin  } from '../middlewares/authMiddleware.mjs';



const router = express.Router();

// @desc Get all users
// @route GET /api/v1/users
// @access Admin
router.get('/list' , authMiddleware, isAdmin, getAllUsers);  // done

// @desc Get a specific user
// @route GET /api/v1/users/:id
// @access public
router.get('/:id',  getUserById ); //done 

// @desc Update a user
// @route PUT /api/v1/users/:id
// @access private
router.put('/:id', authMiddleware , updateUser); //done

// @desc Partially update a user
// @route PATCH /api/v1/users/:id
// @access private
router.patch('/:id',  authMiddleware ,updateUser);//done

// @desc Delete a user
// @route DELETE /api/v1/users/:id
// @access private 
router.delete('/:id' , authMiddleware ,deleteUser); //done 


// @desc Desactivate a user
// @route DELETE /api/v1/users/:id
// @access private

router.post('/desactivate/:id',authMiddleware, desactivateUser , logoutUser); //done

//@desc Updating the user 's pic 
//@router put /user/id/....
//@acess private 

router.route('/:id/profile-picture').put(updateProfilePicture);

//@desc contacts routes
//@acess private 

router.get("/contacts/:id",  getContacts); //done
router.get("/:userId/contact/:id", getContact); //done
router.post("/contacts/:id", addContact);

export default router;
