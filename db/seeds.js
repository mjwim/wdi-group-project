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
    passwordConfirmation: 'password',
    image: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAMAAgDGAAwAAQAAAAAAAA53AAAAJGE1N2RkMWMzLTg0Y2ItNDBjMC05NGE3LTljMzFmMGE2Y2Q4ZQ.jpg'
  }, {
    username: 'philip',
    email: 'philip@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://cdn.images.express.co.uk/img/dynamic/106/590x/prince-philip-435380.jpg'
  }, {
    username: 'matt',
    email: 'matt@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Matt_Damon_TIFF_2015.jpg/220px-Matt_Damon_TIFF_2015.jpg'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Trip.create([{
      location: {
        name: 'London',
        lat: 51.475664764,
        lng: -0.187999248
      },
      image: 'https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
      createdBy: users[0],
      bills: [],
      members: [users[0]]
    },{
      location: {
        name: 'Barcelona',
        lat: 41.390205,
        lng: 2.154007
      },
      image: 'http://tempemp.co/wp-content/uploads/2017/11/barcelona-cultura-historia.jpg',
      createdBy: users[1],
      bills: [],
      members: [users[1]]
    },{
      location: {
        name: 'Sydney',
        lat: -33.865143,
        lng: 151.209900
      },
      image: 'https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[2],
      bills: [],
      members: [users[2]]
    },{
      location: {
        name: 'Berlin',
        lat: 52.520008,
        lng: 13.404954
      },
      image: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/Berlin%20getting%20there.jpg?imwidth=1400',
      createdBy: users[0],
      bills: [],
      members: [users[0]]
    },{
      location: {
        name: 'Oslo',
        lat: 59.911491,
        lng: 10.757933
      },
      image: 'https://www.code-conf.com/images/pages/academy2016/oslo.jpg',
      createdBy: users[1],
      bills: [],
      members: [users[1]]
    },{
      location: {
        name: 'New York',
        lat: 40.730610,
        lng: -73.935242
      },
      image: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[2],
      bills: [],
      members: [users[2]]
    }]);
  })
  .then((trips) => {
    console.log(`${trips.length} trips created!`);
  })
  .finally(() => {
    return mongoose.connection.close();
  })
  .catch(err => console.log(err));
