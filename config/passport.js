const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Move User model import to config folder
require("dotenv").config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://task-kero.onrender.com/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          
  
          let user = await User.findOne({ googleId: profile.id });
  
          if (!user) {
           
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || "", // Ensure email exists
              profilePic: profile.photos?.[0]?.value || "", // Ensure profile pic exists
            });
  
            await user.save();
           
          } 
  
          return done(null, user);
        } catch (err) {
          console.error("Error in Google Authentication:", err);
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
    done(err);
  }
});

module.exports = passport; // Export passport module