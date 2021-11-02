const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { UserType } = require('../types');
const { User } = require('../../models');

const users = {
    type: new GraphQLList(UserType),
    description: "Retrieves list of users",
    resolve(parent, args) {
        return User.find()
    },
}
const user = {
    type: UserType,
    description: "Retrieves one user",
    args: { id: { type: GraphQLString } },
  
    resolve(parent, args, context) {
      if (!context.req.verifiedUser) {
        throw new Error("Unauthorized")
      }
      console.log("aver",User.findById(args.id));
      return User.findById(args.id)

    },
  }
  
  module.exports = { users, user}