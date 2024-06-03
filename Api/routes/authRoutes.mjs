import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.mjs';
import jwt from 'jsonwebtoken'
import { resetPassword, registerUser, loginUser, logoutUser, verifyResetPasswordOTP, updatePasswordWithOTP, activateUser } from '../controllers/userController.mjs';

const router = express.Router();

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
router.get('/logout', logoutUser); // done

//@desc Reset password
//@route POST /api/v1/auth/reset-password
//@access Public
router.post('/reset-password', resetPassword);


// @desc Verify password reset OTP
// @route POST /api/v1/auth/verify-reset-otp
// @access Public
router.post('/verify-otp', verifyResetPasswordOTP);


// @desc Update password with OTP
// @route PUT /api/v1/auth/reset-password
// @access Public
router.put('/reset', updatePasswordWithOTP);


// @desc Activate user
// @route POST /api/v1/auth/activate
// @access Private

router.post('/activate/:id', activateUser);


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

router.get('/google', (req, res) => {
    const redirectUri = 'http://uventlo.icu:1337/auth/google/callback';
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        redirect_uri: redirectUri,
    });
    res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const redirectUri = 'http://uventlo.icu:1337/auth/google/callback';

        const { tokens } = await client.getToken({
            code,
            redirect_uri: redirectUri,
        });

        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, name, email } = payload;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ name, email, googleId });
            await user.save();
        }

        const token = jwt.sign(
            { userId: user._id, userRole: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
        res.redirect('/');
    } catch (error) {
        console.error('Error during Google Auth callback:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;



