const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Home = require('../models/home');

router.use((req, res, next) => {
    if (req.session.currentUser) {
      next();
      return;
    }
  
    res.redirect('/auth/login');
  });


  router.get('/housing', (req, res, next) => {
    Home.find()
      .then((homes) => {
        console.log(homes);
        res.render('housing/housing', { homes })
      })
      .catch((err) => next(err))
    });






module.exports = router;
