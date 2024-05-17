import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.mjs';

passport.use(
  new GoogleStrategy(
    {
      clientID: "44631013144-i5bvncqkd0svcgj6qbeedcahpraeocas.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'http://localhost:1337/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 'user', 
            isActive: true, 
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;