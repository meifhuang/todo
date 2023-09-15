import request from 'supertest';
import app from '../src/app';


describe('POST /register', () => {
    test('should register a user', async () => {
        const user = {
            firstname: 'testname',
            username: 'testuser', 
            password: 'testpass',
            email: 'test@example.com',
        }

    const response = await request(app)
        .post('/register')
        .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(user);
    });

    test('should handle registration errs', async () => {
        const invalidUser = {
            username: 'testuser',
        }
        const response = await request(app)
            .post('/register')
            .send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'missing information');
    })
})
