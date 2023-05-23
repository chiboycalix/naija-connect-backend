import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../entity/User';
import { ROLES } from '../interfaces/role';

dotenv.config()

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
      callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:<port>/auth/google/callback',
    },
    async(accessToken, refreshToken, profile, done) => {
      try {
        const { email, given_name, family_name } = profile._json;
        const password = `${email}`.split('@')[0];
        const hashedPassword = await bcrypt.hash(password, 10);
        const userExist = await User.findOne({ email });
        if (userExist) {
          return done(null, profile);
        }
        await User.create({ email, password: hashedPassword, firstName: given_name, lastName: family_name, role: ROLES.USER })
        return done(null, profile);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
