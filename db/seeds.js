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
      image: 'https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Barcelona',
      image: 'http://tempemp.co/wp-content/uploads/2017/11/barcelona-cultura-historia.jpg',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'Sydney',
      image: 'https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[2],
      bills: [],
      members: []
    },{
      location: 'Berlin',
      image: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/Berlin%20getting%20there.jpg?imwidth=1400',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Oslo',
      image: 'https://www.code-conf.com/images/pages/academy2016/oslo.jpg',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'New York',
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
