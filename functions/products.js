// domain/.netlify/functions/products

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async function (event, context, cb) {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    const products = response.records.map((product) => {
      const { id, fields } = product;

      //   console.log('********************');
      //   console.log(fields);
      //   console.log('********************');
      const {
        name,
        price,
        featured,
        company,
        description,
        category,
        shipping,
        images,
        colors,
      } = fields;
      const { url } = images[0];
      return {
        id,
        name,
        price,
        image: url,
        featured,
        colors,
        company,
        description,
        category,
        shipping,
      };
    });

    console.log('##########');
    console.log(products);
    console.log('##########');

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'There was an error',
    };
  }
};
