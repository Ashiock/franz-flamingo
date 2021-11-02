const { UserType ,PostType , CommentType} = require("../../types");
const { GraphQLList, GraphQLID } = require("graphql");
const { User, Comment, Post } = require("../../../models");

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
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findById(args.id)
  },
}

module.exports = { users, user}
