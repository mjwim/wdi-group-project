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
    username: 'Terry',
    email: 'terry@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2017%2F12%2Fterry-crews-person-of-year-2017-time-magazine-2.jpg&w=800&q=85'
  }, {
    username: 'Philip',
    email: 'philip@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://cdn.images.express.co.uk/img/dynamic/106/590x/prince-philip-435380.jpg'
  }, {
    username: 'Matt',
    email: 'matt@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Matt_Damon_TIFF_2015.jpg/220px-Matt_Damon_TIFF_2015.jpg'
  },
  {
    username: 'Richard',
    email: 'richard@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'http://stfaithdental.com/wp-content/uploads/2016/02/Richard-Simons.jpg'
  },
  {
    username: 'Sally',
    email: 'sally@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'http://koonsfuller.com/wp-content/uploads/2017/05/Sally-Pretorius_LO.jpg'
  },
  {
    username: 'Rupert',
    email: 'rupert@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'http://media.hotbirthdays.com/upload/2015/05/03/rupert-grint.jpg'
  },
  {
    username: 'Megan',
    email: 'megan@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://s3.amazonaws.com/chicago_ideas_production/portraits/full/2683.jpg?1347981305'
  },
  {
    username: 'Jamal',
    email: 'jamal@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://www.famousbirthdays.com/headshots/jamal-edwards-2.jpg'
  },
  {
    username: 'Aubrey',
    email: 'aubrey@ga.co',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://www.biography.com/.image/t_share/MTQ3NTI2OTA4NzY5MjE2MTI4/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg'
  }
  ])
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
      createdBy: users[3],
      bills: [],
      members: [users[3]]
    },{
      location: {
        name: 'Oslo',
        lat: 59.911491,
        lng: 10.757933
      },
      image: 'https://www.code-conf.com/images/pages/academy2016/oslo.jpg',
      createdBy: users[4],
      bills: [],
      members: [users[4]]
    },{
      location: {
        name: 'New York',
        lat: 40.730610,
        lng: -73.935242
      },
      image: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      createdBy: users[5],
      bills: [],
      members: [users[5]]
    },{
      location: {
        name: 'Havana',
        lat: 23.113592,
        lng: -82.366592
      },
      image: 'https://cdn.gobankingrates.com/wp-content/uploads/2016/03/cuba_tourism_photo_of_a_street.jpg',
      createdBy: users[6],
      bills: [],
      members: [users[6]]
    },{
      location: {
        name: 'San Francisco',
        lat: 37.733795,
        lng: -122.446747
      },
      image: 'https://www.apollorv.com/portals/0/Templates/ContentImages/san-francisco.jpg',
      createdBy: users[7],
      bills: [],
      members: [users[7]]
    },{
      location: {
        name: 'Moscow',
        lat: 55.751244,
        lng: 37.618423
      },
      image: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Russia/Moscow-travel-AP98512768-xlarge.jpg',
      createdBy: users[8],
      bills: [],
      members: [users[8]]
    },{
      location: {
        name: 'Bangkok',
        lat: 13.736717,
        lng: 100.523186
      },
      image: 'https://bangkokattractions.com/wp-content/uploads/2016/04/fun-facts-about-bangkok.jpg',
      createdBy: users[0],
      bills: [],
      members: [users[0]]
    },{
      location: {
        name: 'Rome',
        lat: 41.906204,
        lng: 12.507516
      },
      image: 'https://travel.usnews.com/static-travel/images/destinations/108/gettyimages-525777231.jpg',
      createdBy: users[1],
      bills: [],
      members: [users[1]]
    },{
      location: {
        name: 'Rio de Janeiro',
        lat: 22.9068,
        lng: 43.1729
      },
      image: 'https://travelguide.michelin.com/sites/default/files/styles/poi_slideshow/public/images/travel_guide/voyage_media-NX-13429/rio-de-janeiro.jpg?itok=jxhrP5Zp',
      createdBy: users[2],
      bills: [],
      members: [users[2]]
    }

    ]);
  })
  .then((trips) => {
    console.log(`${trips.length} trips created!`);
  })
  .finally(() => {
    return mongoose.connection.close();
  })
  .catch(err => console.log(err));
