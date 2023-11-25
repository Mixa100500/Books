const mutation = require("./mutation")
const query = require("./query")

const resolvers = {
  Query: query,
  Mutation: mutation,
}

module.exports = resolvers