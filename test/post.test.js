const config = require('../config');
const { expect } = require('chai');
const request = require('supertest');

const PORT = config.get('port');
const HOST = config.get('host');

describe('POST /', () => {
    it('responds with { msg: ok }', async () => {
        const res = await request(`${HOST}:${PORT}`).post('/');
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({ msg: 'ok' });
    });

});
