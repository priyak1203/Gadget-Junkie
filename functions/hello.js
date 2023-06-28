// domain/.netlify/functions/hello

const users = [
  { id: 1, name: 'Peter' },
  { id: 2, name: 'John' },
];

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ msg: ' Hello World', users: users }),
  };
};
