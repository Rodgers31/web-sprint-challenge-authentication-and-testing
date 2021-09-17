// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const testUser = { username: 'testUsername', password: 'testpassword ' };

test('sanity', () => {
	expect(true).toBe(true);
});

//register endpoint test
describe('[POST] api/auth/register', async () => {
	it('valid request returning status: 201', async () => {
		await db('users').truncate();
		const res = await request(server).post('/api/auth/register').send(testUser);
		expect(res.status).toBe(201);
	});
	it('invalid request returning status: 500', async () => {
		const res = await request(server)
			.post('/api/auth/register')
			.send({ username: 't', password: '' });
		expect(res.status).toBe(500);
	});
});

//login endpoint test

describe('[POST]/api/auth/login', () => {
	it('If all credetials are valid you get a status 200', async () => {
		const res = await request(server).post('/api/auth/login').send(testUser);
		expect(res.status).toBe(200);
	});
	it('if provided credetials are wrong, user will get status code 500', async () => {
		const res = await request(server)
			.post('/api/auth/login')
			.send({ username: 'jopnny', password: 'test' });
		expect(res.status).toBe(500);
	});
});

describe('[GET] /api/jokes', () => {
	it('to get all jokes should return 401', async () => {
		const res = await request(server).get('/api/jokes');
		expect(res.status).toBe(401);
	});

	it('should return a jason object of all the jokes', async () => {
		const res = await request(server).get('/api/jokes');
		expect(res.type).toBe('application/json');
	});
});
