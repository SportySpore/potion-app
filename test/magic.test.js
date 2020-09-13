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
        console.log('Closed Mock DB');
    })
    //
    it('should create a new transaction', async () => {
        const res = await request(app).post('/api/magic/').send(testData[0]).catch((err) => assert.fail(err));
        assert.equal(res.body.success, true);
        transactionIds.push(res.body.id);
    });

    it('should not create a duplicate transaction', async () => {
        const res = await request(app).post('/api/magic/').send(testData[0]).catch((err) => assert.fail());
        assert.equal(res.body.success, false);
    });

    it('should not create a transaction with missing fields', async () => {
        const res = await request(app).post('/api/magic/').send({firstName: 'John', lastName: 'Smith'}).catch((err) => assert.fail());
        assert.equal(res.body.success, false);
    })

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