const { expect } = require('chai');

const { prepareData } = require('../../handlers/countData');


const data = [
    {
        _id: "5ee1e8dee07f053f990ceaa1",
        key: 'TAKwGc6Jr4i8Z487',
        createdAt: "2017-01-28T01:22:14.398Z",
        counts: [170],
        value: 'Getir Task'
    },
    {
        _id: "5ee1e209e07f053f990cea8c",
        key: 'TAKwGc6Jr4i8Z487',
        createdAt: "2017-01-28T01:22:14.398Z",
        counts: [150, 160],
        value: 'Getir Task'
    },
    {
        _id: "5ee1e8e6e07f053f990ceaa2",
        key: 'TAKwGc6Jr4i8Z487',
        createdAt: "2017-01-28T01:22:14.398Z",
        counts: [120],
        value: 'Getir Task'
    },
    {
        _id: "5ee215d5e07f053f990cf281",
        key: 'kOKMRjkB',
        value: 'NIfvtCpTpJrv',
        createdAt: "2016-12-30T11:56:25.780Z",
        counts: [77, 43]
    },
    {
        _id: "5ee21588e07f053f990cee53",
        key: 'PVLFLSNw',
        value: 'wWrAUOEAAvAM',
        createdAt: "2016-12-30T04:51:57.295Z",
        counts: [1855, 1255, 1074]
    }
];


describe('prepareData', () => {
    it('Returns properly formatted data', () => {
        const preparedData = prepareData(data, 50, 5000);

        expect(preparedData).to.be.an('array');
        expect(preparedData).to.have.property('length', 5);
        expect(preparedData[0]).to.have.keys(['createdAt', 'key', 'totalCount']);
    });

    it('Returns data filtered by count critera', () => {
        const preparedData = prepareData(data, 50, 300);

        expect(preparedData).to.be.an('array');
        expect(preparedData).to.have.property('length', 3);
    });
});
