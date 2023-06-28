// domain/.netlify/functions/products

exports.handler = async function (event, context, cb) {
  return {
    statusCode: 200,
    body: 'Products Route',
  };
};
