import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

router.get('/google', (req, res) => {
    const redirectUri = 'http://localhost:1337/auth/google/callback';
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
        const redirectUri = 'http://localhost:1337/auth/google/callback';

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
