const Joi = require('joi');

const { getClient } = require('../db');

let client;

const dateRE = /^\d{4}-\d{2}-\d{2}$/;

const db_collection = 'records';

const schema = Joi.object({
    startDate: Joi.string().pattern(dateRE).required(),
    endDate: Joi.string().pattern(dateRE).required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required()
});

const handler = async function (req, res) {
    const result = schema.validate(req.body, { allowUknown: false });
    if (result.error) {
        console.error('Error validating request: ', result.error);
        return res.status(400).json({
            code: 1,
            msg: 'validation_error - Please check that all required fields are present and well formatted'
        });
    }

    try {
        client = await getClient();
        const dbData = client.db().collection(db_collection).find({ createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) } });
        const docs = await dbData.toArray();
        const finalRes = prepareData(docs, req.body.minCount, req.body.maxCount);

        return res.json({
            code: 0,
            msg: 'success',
            records: finalRes,
        });
    } catch (err) {
        console.error(`Error occurred while retrieving data from DB: ${err}`);
        return res.status(500).json({
            code: 2,
            msg: 'internal_error - Please try again or contact an administrator if the error persists'
        });
    }
};

const prepareData = (docs, minCount, maxCount) => (docs.reduce((acc, item) => {
    let sum = 0;
    item.counts.forEach((val) => {
        sum += val;
    });

    const obj = {
        createdAt: item.createdAt,
        key: item.key,
        totalCount: sum
    };

    if (sum >= minCount && sum <= maxCount) {
        acc.push(obj);
    }
    return acc;

}, []));

module.exports = handler;
