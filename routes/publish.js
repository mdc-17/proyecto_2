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

router.get('/', (req, res, next) => {
	res.render('publish');
});


//Falta ver cual es el método de cloudinary para poder subir más de una foto.
//¿Si se sube de una en una se mete en el array de fotos?

router.post('/', uploadCloud.single('photos'), (req, res, next) => {
	const { hostRequest, location, address, services } = req.body;
	const homeImages = req.file.url;
	const theUser = req.session.currentUser._id;

	if (hostRequest === '' || location === '' || address === '') {
		res.render('/publish', {
			errorMessage: 'Todos los campos de petición, localización y dirección deben estar rellenados'
		});
		return;
	}

  const homeSubmission = { host: theUser, hostRequest, location, address, homeImages, services };
  const newHome = new Home (homeSubmission);

  Home.save()
      .then(() => {
        res.render('/publish', { newHome })
      })
      .catch((err) => next(err))
      

});

module.exports = router;