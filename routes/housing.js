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




module.exports = router;
