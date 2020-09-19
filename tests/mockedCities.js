// Documents for db
exports.toulouse = {
  name: 'Toulouse',
  location: {
    type: 'Point',
    coordinates: [-1.234, 44.56],
  },
  travels: [],
};

exports.paris = {
  name: 'Paris',
  location: {
    type: 'Point',
    coordinates: [-3, 87],
  },
  travels: [],
};

exports.bordeaux = {
  name: 'Bordeaux',
  location: {
    type: 'Point',
    coordinates: [-1.234, 44.56],
  },
  comments: 'Far away city',
  rating: 2,
  travels: [],
};

exports.nantes = {
  location: {
    type: 'Point',
    coordinates: ['not a number'],
  },
  travels: [{ name: 'not an id' }],
};
