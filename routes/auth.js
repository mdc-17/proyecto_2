const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const bcryptSalt = 10;



router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;
  const phoneInput = req.body.phoneNumber;

  if (usernameInput === '' || emailInput === '' || passwordInput === '' || phoneInput === '') {
    res.render('auth/signup', {
      errorMessage: 'Por favor, introduce nombre, email, contraseña y teléfono.'
    });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('auth/signup', {
        errorMessage: `El email ${emailInput} ya está usado.`
      });
      return;
    }
  })  

   User.findOne({ username: usernameInput }, '_id', (err,existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('auth/signup', {
        errorMessage: `El username ${usernameInput} ya está usado.`
      });
      return;
    }
  }) 

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      username: usernameInput,
      email: emailInput,
      password: hashedPass,
      phoneNumber: phoneInput
    };

    const theUser = new User(userSubmission);
    
    console.log('theUser', theUser)

    theUser.save(err => {
      if (err) {
        res.render('auth/signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }

      res.redirect('/');
    });
});

router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });


router.post('/login', (req, res, next) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
  
    if (usernameInput === '' || passwordInput === '') {
      res.render('auth/login', {
        errorMessage: 'Enter both email and password to log in.'
      });
      return;
    }
  
    User.findOne({ username: usernameInput }, (err, theUser) => {
      if (err || theUser === null) {
        res.render('auth/login', {
          errorMessage: `There isn't an account for user: ${usernameInput}.`
        });
        return;
      }
  
      if (!bcrypt.compareSync(passwordInput, theUser.password)) {
        res.render('auth/login', {
          errorMessage: 'Invalid password.'
        });
        return;
      }
  
      req.session.currentUser = theUser;
      res.redirect('/main');
    });
  });

  router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/auth/login');
      return;
    }
  
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
  
      res.redirect('/auth/login');
    });
  });

  

module.exports = router;