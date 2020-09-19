const mongoose = require('mongoose');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const TravelModel = require('../models/Travel');
const CityModel = require('../models/City');
const { firstTravel } = require('./mockedTravels');

//FIXME: Get Fictive DB to make the tests
let travelIdToUse;

afterAll(done => {
  mongoose.connection.close();
  done();
});

it('GET /api/v1/travels ', async done => {
  const response = await request.get('/api/v1/travels');
  expect(response.status).toBe(200);
  done();
});

it('POST /api/v1/travels', async done => {
  const response = await request.post('/api/v1/travels').send(firstTravel);
  travelIdToUse = response.body.data._id;
  expect(response.status).toBe(201);
  expect(response.body.success).toBeTruthy();
  expect(response.body.count).not.toBe(0);
  done();
});

it('GET /api/v1/travels/:id ', async done => {
  const response = await request.get(`/api/v1/travels/${travelIdToUse}`);
  expect(response.status).toBe(200);
  expect(response.body.data.title).toBe('De Montauban à Paris');
  expect(response.body.data.cities).toHaveLength(4);
  done();
});

it('PUT /api/v1/travels/:id', async done => {
  const response = await request
    .put(`/api/v1/travels/${travelIdToUse}`)
    .send({ title: 'Voyage modifié' });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.data.title).toBe('Voyage modifié');
  done();
});

it('DELETE /api/v1/travels/:id', async done => {
  const response = await request.delete(`/api/v1/travels/${travelIdToUse}`);
  const travelDeleted = await request.get(`/api/v1/travels/${travelIdToUse}`);
  expect(response.status).toBe(200);
  expect(travelDeleted.status).toBe(404);
  expect(response.body.success).toBeTruthy();
  expect(travelDeleted.body.success).toBeFalsy();
  expect(response.body.data).toMatchObject({});
  expect(travelDeleted.body.error).toBeDefined();
  done();
});

// describe('Travel Model Tests', () => {
//   beforeAll(async () => {
//     await mongoose.connect(
//       global.__MONGO_URI__,
//       {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       },
//       err => {
//         if (err) {
//           console.log(err);
//           process.exit(1);
//         }
//       }
//     );
//   });

//   beforeEach(async () => {
//     await TravelModel.create(firstTravel);
//   });
//   afterEach(async () => {
//     await TravelModel.deleteMany({});
//     await CityModel.deleteMany({});
//   });
//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it('Should save travel to database', async done => {
//     const res = await req.post('/api/v1/travels').send({
//       title: 'De Montauban à Paris',
//       cities: [
//         {
//           name: 'Toulouse',
//           location: {
//             type: 'Point',
//             coordinates: [1.444209, 43.604652],
//           },
//         },
//       ],
//     });
//     expect(res.body.title).toBeTruthy();

//     done();
//   });

//   // it('Post a travel successfully', async () => {
//   //   const savedTravel = await TravelModel.findOne({
//   //     title: 'De Montauban à Paris',
//   //   });
//   //   expects(savedTravel._id).toBeDefined();
//   // });
// });
