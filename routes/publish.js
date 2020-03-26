const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const User = require('../models/user');
const Home = require('../models/home');

router.use((req, res, next) => {
	if (req.session.currentUser) {
		next();
		return;
	}
	res.redirect('/auth/login');
});

router.get('/publish', (req, res, next) => {
Home.find({ host: req.session.currentUser._id })
.populate('guest')
	.then((homes) => {	
		res.render('publish/publish', { homes })	
	})
	.catch((err) => next(err))
});

router.get('/aceptar/:id', (req, res, next) => {
	const { id } = req.params;
	Home.findOneAndUpdate({_id: id}, {$set: {statusRequest: 'Aceptado', requestAccepted: true}}, {new: true})
		.then(() => {
			Home.find({ host: req.session.currentUser._id })
				.populate('guest')
				.then((homes) => {	
				res.render('publish/publish', { homes })	
			})
			.catch((err) => next(err))	
	})
	.catch((err) => next(err))
});

router.get('/denegar/:id', (req, res, next) => {
	const { id } = req.params;
	Home.findOneAndUpdate({_id: id},  {$set: {statusRequest: '', requestAccepted: false, guest: null}}, {new: true})
		.then(() => {
				res.redirect('/publish/publish')	
	})
	.catch((err) => next(err))
});

router.get('/eliminar/:id', (req, res, next) => {
	const { id } = req.params;
	Home.findOneAndDelete({_id: id})
		.then(() => {
				res.redirect('/publish/publish')		
	})
	.catch((err) => next(err))
});


//Falta ver cual es el método de cloudinary para poder subir más de una foto.
//¿Si se sube de una en una se mete en el array de fotos?

router.post('/publish', uploadCloud.single('photos'), (req, res, next) => {
	const { hostRequest, location, address, services, hostRequestDetail, description } = req.body;
	const homeImages = req.file.url;
	const theUserID = req.session.currentUser._id;

	if (hostRequest === '' || location === '' || address === '') {
		res.render('publish/publish', {
			errorMessage: 'Todos los campos de petición, localización y dirección deben estar rellenados'
		});
		return;
	}

  const homeSubmission = { host: theUserID, hostRequest, location, address, homeImages, services, hostRequestDetail, description };
  const newHome = new Home (homeSubmission);

 User.findOneAndUpdate({_id: theUserID}, {isHost:true})
	 .then()
	 .catch((err) => next(err))	
   	
  newHome.save()
      .then(() => {
        res.redirect('/publish/publish')
      })
	  .catch((err) => next(err))


});


router.get('/add', (req, res, next) => {
	res.render('publish/add');
});



module.exports = router;
