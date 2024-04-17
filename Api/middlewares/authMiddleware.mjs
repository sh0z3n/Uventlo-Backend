import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.mjs';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    console.log(user)

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

// Authentication middleware
export const authMiddleware = passport.authenticate('jwt', { session: false });

// Admin role verification middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is authorized as an admin
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
};
