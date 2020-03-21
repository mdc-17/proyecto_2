### README ###

Project Hellou!


### Descripción ###

This is a website designed for mobile devices where the user could offer rooms in exchange for a service or could book a room accepting the request required by the host.


### User Stories ###


- 404 Error - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

- 500 Error - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- Homepage - As a user I want to be able to access the homepage so that I see what the app is about, login, signup and check some reviews (backlog).

- Sign up - As a user I want to sign up on the webpage so that I can create my account and have access to all the options available.

- Log in - As a user I want to be able to log in on the webpage so that I can whether offer my house in exchange for a request or book a room accepting the host's request.

- Log out - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

- Booking: As a user I want to see all the requests for my rooms.
I also want to see my booking requests which I made to a host.

-Create house: As a user I want to make my rooms available and make a requirement to stay.

- Accepting or denying requests: As a user I want to accept or deny the guest's requests.

- Making bookings: As a user I want to book a room accepting as payment the host's requirement.

- Seeing details: As a user I want to see the photos and description of the rooms with everything that includes and also the services that the host of the house requires.


### Backlog ###


- The host's phone only seen once the request from a guest is accepted.
- Complaints and claims management.
- Google maps location.
- Rating and reviews.
- Offer different rooms.

### ROUTES ###

GET /auth/login
If it's OK we will render /auth/login
If it's not OK we will show errors.

POST /auth/login
We will send on the body:
    - username
    - password
If the user's login it's OK redirect to /home.
If the user's login it's not OK we will show errors.


GET /auth/signup
If it's OK we will render /auth/signup
If it's not OK we will show errors.

POST /auth/signup
We will send on the body:
    - username
    - email
    - password
    - location
If the user's signup it's OK redirect to /auth/login.
If the user's signup it's not OK we will render /auth/signup with errors.

GET /auth/logout
If there isn't an active session, redirect to /auth/login.
If there is an active session, we destroy the session an redirect to /auth/login.

GET /publish
If it's OK we will render /publish
If it's not OK we will show errors.


### He llegado hasta aquí Miguel ###
POST /publish
	Si todo esta bien redirige a /publish con un body:
Población
Localización
Calle
Imágenes
Servicios ofrecidos

	Si todo sale mal, renderiza /publish con los errores. 

GET /housing
	Renderizar  la ruta de /housing con la info de los alojamientos

GET /bookings
	Renderizar la ruta de /booking con la info de los alojamientos



### Models ###

Model 1: User

{
    name: {type: String, required: true, unique: true, match: [/^[a-zA-Z]+(([‘,. -][a-zA-Z ])?[a-zA-Z]*)*$/g, ‘is invalid’]},
    email: 	{type: String, required: true, unique: true, match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g, ‘is invalid’]},
    password: {type: String, required: true, match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g,‘is invalid’]},
    photo_user: String,
    isHost: {type: Boolean, default:false},
    isGuest: {type: Boolean, default:false},
    requests: [ {type: String } ],
    statusRequest: {type: String, enum: [“Aceptado”, “Denegado”, “Pendiente”]},
    phoneNumber: Number,
    hostRequest: String

//BACKLOG rating: {type: Number}
}




Model 2: House

{
	host: {type: Schema.Types.ObjectId, ref: “User”},
	guest: [ {type: Schema.Types.ObjectId, ref: “User”} ],
	photo_house: [ {type: String}], 
    location: String,
    services: [{type: String}],
    wifi: {type: Boolean, default: false},
    washer: {type: Boolean, default: false},
    dryer: {type: Boolean, default: false},
    iron: {type: Boolean, default: false},
    hairDryer: {type: Boolean, default: false},
    towels: {type: Boolean, default: false},
    heating: {type: Boolean, default: false},
    airConditioner: {type: Boolean, default: false},
    tv: {type: Boolean, default: false}
    
    //BACKLOG date: {type: date}
}


### Links ###

Trello

URL: https://trello.com/b/L54t1eqz


Git

URL: https://github.com/mdc-17/proyecto_2


Slides

URL: 

