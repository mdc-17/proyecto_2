const mongoose = require('mongoose');
const Home = require('../models/home');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
Home.collection.drop();

const homes = [
  {
    host: ObjectId("5e79eb68a54620713865313b"),
	guest: null,
	hostRequest: "Comida",
	hostRequestDetail: "Hacer comida todos los viernes",
	location: "Malaga",
	address: "Gran Sol Bloque 17 2A",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	homeImages: ["https://estaticos.efe.com/efecom/recursos2/imagen.aspx?lVW2oAh2vjNIJFog2xk4UilHdmi9xzP1Q4TncnkXVSTX-P-2bAoG0sxzXPZPAk5l-P-2fU5UsajaAIQ1i7LVuY1TAxG5FA-P-3d-P-3d"],
	services: [],
	requestAccepted: false
  }
]
  Home.create(homes, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${homes.length} homes`)
  });