// @ts-nocheck

const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(
  session({
    secret: 'unsupersecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send('<a href="/auth/google">Se connecter avec Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  console.log('session : ', req.session);
  res.send(
    `<h1>Profil Google</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`
  );
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`server launched on http://localhost:${PORT}`);
});