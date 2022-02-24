const config = require('../../config');
const { expect } = require('chai');
const request = require('supertest');

const PORT = config.get('port');
const HOST = config.get('host');

function getReqBody() {
    return {
        startDate: '2016-01-11',
        endDate: '2016-03-11',
        minCount: 500,
        maxCount: 3500
    }
}

describe('POST /countData', () => {

    describe('Happy flow', () => {
        it('Returns valid response', async () => {
            const res = await request(`${HOST}:${PORT}`)
                .post('/countData')
                .send(getReqBody());

            expect(res.status).to.eql(200);
            expect(res.body).to.have.keys(['code', 'msg', 'records']);
            expect(res.body.records).to.be.an('array');
            expect(res.body.records[0]).to.have.keys(['createdAt', 'key', 'totalCount']);
        });
    });

    describe('Error flow', () => {
        // the tests below would be repeated for all fields in the request
        it('Returns validation error if start date is empty', async () => {
            const req = getReqBody();
            req.startDate = '';

            const res = await request(`${HOST}:${PORT}`)
                .post('/countData')
                .send(req);

            expect(res.status).to.eql(400);
            expect(res.body).to.eql({
                code: 1,
                msg: 'validation_error - Please check that all required fields are present and well formatted'
            });
        });

        it('Returns validation error if start date is not present', async () => {
            const req = getReqBody();
            delete req.startDate;

            const res = await request(`${HOST}:${PORT}`)
                .post('/countData')
                .send(req);

            expect(res.status).to.eql(400);
            expect(res.body).to.eql({
                code: 1,
                msg: 'validation_error - Please check that all required fields are present and well formatted'
            });
        });

        it('Returns validation error if start date is malformed', async () => {
            const req = getReqBody();
            req.startDate = 'abc123';

            const res = await request(`${HOST}:${PORT}`)
                .post('/countData')
                .send(req);

            expect(res.status).to.eql(400);
            expect(res.body).to.eql({
                code: 1,
                msg: 'validation_error - Please check that all required fields are present and well formatted'
            });
        });

    });

});
