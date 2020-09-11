process.env.NODE_ENV = 'test';

const dotenv = require('dotenv');
dotenv.config({path: '../config/config.env'});
const {assert} = require('chai');
const request = require('supertest');
const app = require('../app.js');
const conn = require('../config/db');
const testData = require('./transactionsData');

describe('GET /api/magic', () => {
    let transactionIds = [];

    before(async () => {
        await conn.connect().catch((err) => process.exit(1));
    })

    after(async () => {
        await conn.close().catch((err) => process.exit(1));
    })

    it('should create a new transaction', async () => {
        try {
            const res = await request(app).post('/api/magic/').send(testData[0]).catch((err) => assert.fail());
            assert.equal(res.body.success, true);
            transactionIds.push(res.body.id);
        } catch (err) {
            assert.fail();
        }
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