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


 /*  router.get('/housing', (req,res,next) => {
  res.render('housing/housing')
}); */

router.post('/housing', (req,res,next) => {
const { locationQuery} = req.body
  Home.find({location: locationQuery})
      .then(homesLocation => {
        res.render('housing/housing', { homesLocation })
      })
      .catch(err => next(err))



})






module.exports = router;
