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

      router.post('/edit', (req, res, next) => {
        const {username, email, phoneNumber, photo_user }=req.body;
        User.findOneAndUpdate({_id: req.query.user_id},{$set: {username, email, phoneNumber, photo_user }},{new:true})
            .then(() =>
            res.redirect('/profile/profile'))
            .catch((err) => next(err));
      });


   
      

  module.exports = router;