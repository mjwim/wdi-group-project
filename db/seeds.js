const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Trip = require('../models/trip');

mongoose.connect(dbURI);

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
      image: '',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Barcelona',
      image: '',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'Sydney',
      image: '',
      createdBy: users[2],
      bills: [],
      members: []
    },{
      location: 'Berlin',
      image: '',
      createdBy: users[0],
      bills: [],
      members: []
    },{
      location: 'Oslo',
      image: '',
      createdBy: users[1],
      bills: [],
      members: []
    },{
      location: 'New York',
      image: '',
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
