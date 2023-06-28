// domain/.netlify/functions/single-product

exports.handler = async function () {
  return {
    statusCode: 200,
    body: 'Single Product Route',
  };
};
