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


router.get('/main', (req,res,next) => {
    res.render('main')
});




  

  
  module.exports = router;