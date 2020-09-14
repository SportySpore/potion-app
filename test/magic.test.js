process.env.NODE_ENV = 'test';
process.env.PORT = '5000';

const {assert} = require('chai');
const request = require('supertest');
const app = require('../app.js');
const db = require('../config/db');
const testData = require('./transactionsData');

describe('/api/magic', () => {
    let transactionIds = [];

    before(async () => {
        await db.connect().catch((err) => process.exit(1));
        console.log('Connected to Mock DB');
    })

    after(async () => {
        await db.close().catch((err) => process.exit(1));
    })
    //
    it('should create a new transaction', async () => {
        const res = await request(app).post('/api/magic/').send(testData[0]).catch((err) => assert.fail(err));
        assert.isNotEmpty(res.body.id);
        transactionIds.push(res.body.id);
    });

    it('should not create a duplicate transaction', async () => {
        const res = await request(app).post('/api/magic/').send(testData[0]).catch((err) => assert.fail());
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with invalid Email', async () => {
        const res = await request(app).post('/api/magic/').send({...testData[1], email: 'foo'}).catch((err) => assert.fail());
        assert.equal(res.body.error[0], 'Email Address in not in a valid format');
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with invalid phone number', async () => {
        const res = await request(app).post('/api/magic/').send({...testData[1], phone: '123'}).catch((err) => assert.fail());
        assert.equal(res.body.error[0], 'Phone number is not in the valid format ###-###-####');
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with invalid expiration date', async () => {
        const res = await request(app).post('/api/magic/').send({...testData[1], payment: {ccNum: '123', exp: '14444'}}).catch((err) => assert.fail());
        assert.equal(res.body.error[0], 'Expiration Date is not in the valid format MM/YY');
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with quantity less than 1', async () => {
        const res = await request(app).post('/api/magic/').send({...testData[1], quantity: 0}).catch((err) => assert.fail());
        assert.equal(res.body.error[0], 'Quantity is less than the minimum allowed value (1)');
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with quantity greater than 3', async () => {
        const res = await request(app).post('/api/magic/').send({...testData[1], quantity: 4}).catch((err) => assert.fail());
        assert.equal(res.body.error[0], 'Quantity is more than the maximum allowed value (3)');
        assert.equal(res.body.success, false);
    });

    it('should get the transaction', async () => {
        const res = await request(app).get(`/api/magic/${transactionIds[0]}`).catch(() => assert.fail());
        assert.equal(res.status, 200);
    });

    it('should not get a transaction', async () => {
        const res = await request(app).get(`/api/magic/123`).catch(() => assert.fail());
        assert.equal(res.status, 404);
    });


    it('should update the transaction', async () => {
        const res = await request(app).patch(`/api/magic`).send({id: transactionIds[0], fulfilled: true}).catch(() => assert.fail());
        assert.equal(res.status, 200);
    });

    it('should not update any transaction', async () => {
        const res = await request(app).patch(`/api/magic`).send({id: '123', fulfilled: true}).catch(() => assert.fail());
        assert.equal(res.status, 404);
    });

    it('should delete the transaction', async () => {
        const res = await request(app).delete(`/api/magic/${transactionIds[0]}`).send({id: '123', fulfilled: true}).catch(() => assert.fail());
        assert.equal(res.status, 200);
    });

    it('should not delete a transaction', async () => {
        const res = await request(app).delete(`/api/magic/${transactionIds[0]}`).send({id: '123', fulfilled: true}).catch(() => assert.fail());
        assert.equal(res.status, 404);
    });
})