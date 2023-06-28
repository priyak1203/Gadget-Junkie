// domain/.netlify/functions/single-product

exports.handler = async function (event, context, cb) {
  return {
    statusCode: 200,
    body: 'Single Product Route',
  };
};
