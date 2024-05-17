import express from 'express';
import morgan from 'morgan' ;
import passport from 'passport';

import { resetPassword } from '../controllers/userController.mjs';

const router = express.Router();
//@desc Reset password
//@route POST /api/v1/auth/reset-password
//@access Public
router.post('/reset-password', resetPassword);

// userRouter.mjs
import { verifyResetPasswordOTP } from '../controllers/userController.mjs';

// @desc Verify password reset OTP
// @route POST /api/v1/auth/verify-reset-otp
// @access Public
router.post('/verify-otp', verifyResetPasswordOTP);

// userRouter.mjs
import { updatePasswordWithOTP } from '../controllers/userController.mjs';

// @desc Update password with OTP
// @route PUT /api/v1/auth/reset-password
// @access Public
router.put('/reset', updatePasswordWithOTP);


import { activateUser } from '../controllers/userController.mjs';

// @desc Activate user
// @route POST /api/v1/auth/activate
// @access Private

router.post('/activate/:id', activateUser);


router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect or respond as needed
      res.redirect('/dashboard');
    }
  );


export default router;
