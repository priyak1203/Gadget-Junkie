// domain/.netlify/functions/products

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async function (event, context, cb) {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    console.log('##########');
    console.log(response);
    console.log('##########');

    return {
      statusCode: 200,
      body: 'Products Route',
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'There was an error',
    };
  }
};
