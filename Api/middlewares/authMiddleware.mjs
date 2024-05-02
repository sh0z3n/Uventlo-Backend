import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.mjs';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;

    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET );

        req.user = { _id: decoded.userId, role: decoded.userRole };
        
        console.log(decoded.userId)
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user.role = decoded.userRole
        console.log(req.user.role)
        next();

    } 
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' }).redirect("/login");
    }
});

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
    next();
  };