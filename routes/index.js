var express = require('express');
var router = express.Router();
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    title: String,
    text: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  title: () => 'Express',
  text: () => 'Glad seeing you here my dude!'
};

// Run the GraphQL query '{ hello }' and print out the response

/* GET home page. */
router.get('/', async (req, res, next) => {
  const response = await graphql(schema, '{ title, text }', root);
  res.render('index', { title: response.data.title, text: response.data.text });
});

module.exports = router;
