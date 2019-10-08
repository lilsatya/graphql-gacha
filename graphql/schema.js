var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Gacha {
    rank: String!
    name: String!
    power: Int!
    bonus: Boolean
  }

  type Query {
    pull(numPull: Int!): [Gacha]
  }
`);

module.exports = schema;
