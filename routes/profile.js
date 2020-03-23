const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use((req, res, next) => {
    if (req.session.currentUser) {
      next();
      return;
    }
  
    res.redirect('/auth/login');
  });

  router.get('/profile', (req, res, next) => {
    User.findOne({_id: req.session.currentUser._id})
      .then((user) => {
        console.log(user);
        res.render('profile/profile', { user })
      })
      .catch((err) => next(err))
    });

    router.get('/edit', (req, res, next) => {
        User.findOne({_id: req.query.user_id})
        .then((user) => {
          res.render("profile/profile-edit", {user});
        })
        .catch((error) => {
          console.log(error);
        })
      });

   
      

  module.exports = router;