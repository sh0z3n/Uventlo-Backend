import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.mjs';
import { OAuth2Client } from 'google-auth-library';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = { _id: decoded.userId, role: decoded.userRole };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const ip = req.ip; 
    if (req.rateLimit.remaining === 0) {
      return res.status(429).json({ message: 'Too many requests from this IP, please try again later.' });
    }
    if ( req.params.userId && req.user._id !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized: You can only perform this action on your own resources' });
    }
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

    export const isAdmin = (req, res, next) => {
        if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }
        next();
    };

    export const isUser = async (req,res,next) => // idk how to use it until ntla9a boutebba 
{
        const user = await User.findById(req.user._id); 
        if (!user || !user.isActive ) {
        return res.status(403).json({ message: 'Unauthorized: Organizer access required' });
        }
        next();

};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res, next) => {
  try {
    const { googleIdToken } = req.body;

    if (!googleIdToken) {
      return next(); // Skip authentication if googleIdToken mkanch
    }

    const ticket = await client.verifyIdToken({
      idToken: googleIdToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    req.authToken = jwtToken;

    next();
  } catch (error) {
    res.status(400).json({ message: 'Google authentication failed', error });
  }
};