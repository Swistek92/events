// import supertest from 'supertest';
const { default: mongoose } = require('mongoose');
const request = require('supertest');
const app = require('../app');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

describe('TEST for <=======>  POST /api/v1/events/', function () {
  beforeAll(async () => {
    const DB = process.env.DATABASE;
    mockgoose.prepareStorage().then(function () {
      mongoose
        .connect(DB)
        .then(() => console.log('DB connect successfully'))
        .catch((error) => new AppError('cant connect db ', error, 404));
    });
  });

  it('responds with 201 for correct DATA', async () => {
    const correctData = {
      date: new Date(),
      firstName: 'ssaadss',
      lastName: 'zzzadszzzz',
      email: 'asd@asda.pl',
    };
    const res = await request(app).post('/api/v1/events/').send(correctData);
    expect(res.statusCode).toBe(201);
  });
  it('responds with 400 bad date in data', async () => {
    const data = {
      date: 'lalala',
      firstName: 'ssaadss',
      lastName: 'zzzadszzzz',
      email: 'asd@asda.pl',
    };
    const res = await request(app).post('/api/v1/events/').send(data);

    const err = JSON.parse(res.error.text);
    const fail = err.status === 'fail';
    const msg = err.message.startsWith('ValidationError');

    expect(res.statusCode).toBe(400);
    expect(fail).toBe(true);
    expect(msg).toBe(true);
  });
  it('responds with 400 bad firstName in data', async () => {
    const data = {
      date: 'lalala',
      firstName: '',
      lastName: 'zzzadszzzz',
      email: 'asd@asda.pl',
    };
    const res = await request(app).post('/api/v1/events/').send(data);

    const err = JSON.parse(res.error.text);
    const fail = err.status === 'fail';
    const msg = err.message.startsWith('ValidationError');

    expect(res.statusCode).toBe(400);
    expect(fail).toBe(true);
    expect(msg).toBe(true);
  });
  it('responds with 400 bad lastName in data', async () => {
    const data = {
      date: 'lalala',
      firstName: 'asdasdasd',
      lastName: '',
      email: 'asd@asda.pl',
    };
    const res = await request(app).post('/api/v1/events/').send(data);

    const err = JSON.parse(res.error.text);
    const fail = err.status === 'fail';
    const msg = err.message.startsWith('ValidationError');

    expect(res.statusCode).toBe(400);
    expect(fail).toBe(true);
    expect(msg).toBe(true);
  });
  it('responds with 400 bad email in data', async () => {
    const data = {
      date: 'lalala',
      firstName: 'asdasdasd',
      lastName: 'asdasdasd',
      email: '',
    };
    const res = await request(app).post('/api/v1/events/').send(data);

    const err = JSON.parse(res.error.text);
    const fail = err.status === 'fail';
    const msg = err.message.startsWith('ValidationError');

    expect(res.statusCode).toBe(400);
    expect(fail).toBe(true);
    expect(msg).toBe(true);
  });
});

describe('TEST error hanlder', () => {
  it('responds with 404  when call non-existent path', async () => {
    const res = await request(app).get('/api/v1/events/');
    const err = JSON.parse(res.error.text);
    const fail = err.status === 'fail';
    const msg = err.message.startsWith("Can't find ");

    expect(fail).toBe(true);
    expect(msg).toBe(true);

    expect(res.statusCode).toBe(404);
  });
});
