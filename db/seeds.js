const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI, env } = require('../config/environment');
const User = require('../models/user');
const Trip = require('../models/trip');

mongoose.connect(dbURI[env]);

User.collection.drop();
Trip.collection.drop();

User
  .create([{
    username: 'modestas',
    email: 'modestas@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'philip',
    email: 'philip@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'matt',
    email: 'matt@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Trip.create([{
      location: 'London',
      latitude: 51.475664764,
      longitude: -0.187999248,
      image: 'https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Barcelona',
      latitude: 41.390205,
      longitude: 2.154007,
      image: 'http://tempemp.co/wp-content/uploads/2017/11/barcelona-cultura-historia.jpg',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'Sydney',
      latitude: -33.865143,
      longitude: 151.209900,
      image: 'https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[2],
      bills: [],
      members: []
    },{
      location: 'Berlin',
      latitude: 52.520008,
      longitude: 13.404954,
      image: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/Berlin%20getting%20there.jpg?imwidth=1400',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Oslo',
      latitude: 59.911491,
      longitude: 10.757933,
      image: 'https://www.code-conf.com/images/pages/academy2016/oslo.jpg',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'New York',
      latitude: 40.730610,
      longitude: -73.935242,
      image: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[2],
      bills: [],
      members: []
    }]);
  })
  .then((trips) => {
    console.log(`${trips.length} trips created!`);
  })
  .finally(() => {
    return mongoose.connection.close();
  })
  .catch(err => console.log(err));
