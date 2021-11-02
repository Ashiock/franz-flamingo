const { UserType ,PostType , CommentType} = require("../types")
const { GraphQLList, GraphQLID } = require("graphql")
const { User, Comment, Post } = require("../../models")

const comments = {
  type: new GraphQLList(CommentType),
  description: "Retrieves list of comments",
  resolve() {
    return Comment.find()
  },
}

const comment = {
  type: CommentType,
  description: "Retrieves one comment",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Comment.findById(args.id)
  },
}

module.exports = { comments, comment }
