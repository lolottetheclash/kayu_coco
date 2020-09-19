const mongoose = require('mongoose');
const CityModel = require('../models/City');
const { toulouse, paris, bordeaux, nantes } = require('./mockedCities');

describe('City Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  beforeEach(async () => {
    await CityModel.create(toulouse);
  });

  afterEach(async () => {
    await CityModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Post a city successfully', async () => {
    const savedCity = await CityModel.create(paris);

    expect(savedCity._id).toBeDefined();
    expect(savedCity.location.coordinates).toContain(-3);
    expect(savedCity.location.coordinates).toHaveLength(2);
    expect(savedCity.travels).toHaveLength(0);
  });

  it('Get specific city & All cities successfully', async () => {
    const foundCity = await CityModel.findOne({ name: 'Toulouse' });
    const allCities = await CityModel.find();

    expect(foundCity).not.toBeUndefined();
    expect(foundCity.name).toBe('Toulouse');
    expect(allCities).toHaveLength(1);
  });

  it('Update specific city successfully', async () => {
    const foundCity = await CityModel.findOne({ name: 'Toulouse' });
    await CityModel.findByIdAndUpdate(
      foundCity._id,
      {
        name: 'Port La Nouvelle',
      },
      { new: true, runValidators: true }
    );

    const oldToulouse = await CityModel.findOne({ name: 'Toulouse' });
    const pln = await CityModel.findOne({ name: 'Port La Nouvelle' });

    expect(oldToulouse).toBeFalsy();
    expect(pln.name).toBe('Port La Nouvelle');
  });

  it('Delete specific city successfully', async () => {
    const deletedCity = await CityModel.deleteOne({ name: 'Toulouse' });
    const allCities = await CityModel.find();

    expect(deletedCity).toBeDefined();
    expect(allCities).toHaveLength(0);
  });

  it('Should not save fields which do not exist in schema', async () => {
    const cityWithExtraFields = await CityModel.create(bordeaux);

    expect(cityWithExtraFields.name).toBe('Bordeaux');
    expect(cityWithExtraFields.comments).toBeUndefined();
    expect(cityWithExtraFields.rating).toBeUndefined();
  });

  it('Fields validation is working', async () => {
    let unvalidCity;
    let err;
    try {
      unvalidCity = await CityModel.create(nantes);
    } catch (error) {
      err = error;
    }
    expect(unvalidCity).toBeUndefined();
    expect(err.errors).toBeDefined();
    expect(err._message).toBe('City validation failed');
  });
});
