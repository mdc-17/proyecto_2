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

  router.get('/booking', (req,res,next) => {
    Home.find({ guest: req.session.currentUser})
    .then((mybookings) => {
    res.render('booking/booking', { mybookings } )
  })
    .catch((err) => next(err))
})

router.get('/cancelar/:id', (req, res, next) => {
	const { id } = req.params;
	Home.findOneAndUpdate({_id: id},  {statusRequest: '', $unset: {guest: 1}}, {new: true})
		.then(() => {	
    res.redirect('/bookings/booking')
})
	.catch((err) => next(err))
});

  router.post('/booking/:id', (req,res,next) => {
    const { id } = req.params;
        Home.findOneAndUpdate( { _id: id }, {$set: {guest: req.session.currentUser, statusRequest: 'Pendiente'}})
            .then(() => {
                res.redirect('/bookings/booking' )
            })
            .catch((err) => next(err))
    })
  

module.exports = router;