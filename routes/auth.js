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
        console.log(err);
        res.render('auth/signup', {
          errorMessage: 'Algo fue mal. Inténtalo de nuevo.'
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
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
  
    if (emailInput === '' || passwordInput === '') {
      res.render('auth/login', {
        errorMessage: 'Introduce tanto email como contraseña para iniciar sesión.'
      });
      return;
    }
  
    User.findOne({ email: emailInput }, (err, theUser) => {
      if (err || theUser === null) {
        res.render('auth/login', {
          errorMessage: `No hay cuenta para este email: ${emailInput}.`
        });
        return;
      }
  
      if (!bcrypt.compareSync(passwordInput, theUser.password)) {
        res.render('auth/login', {
          errorMessage: 'Contraseña incorrecta.'
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