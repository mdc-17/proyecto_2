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


    router.post('/housing', (req,res,next) => {
    const { locationQuery } = req.body    
        Home.find( {$and: [ { location: locationQuery }, {guest: null}, {host: {$ne: req.session.currentUser}} ] } )
            .then(homesLocation => {
                res.render('housing/housing', { homesLocation})
            })
            .catch((err) => next(err))
    })

    router.get('/view', (req, res, next) => {
      Home.findOne({_id: req.query.home_id})
        .then((home) => {
          console.log(home);
          res.render('housing/view', { home })
        })
        .catch((err) => next(err))
      });

    

module.exports = router;