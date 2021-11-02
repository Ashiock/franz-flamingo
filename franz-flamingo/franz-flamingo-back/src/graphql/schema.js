// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")


//  // Import queries
 const { users, user } = require("./queries/user")
 const { ringtones, ringtone, searchRingtones} = require("./queries/ringtone")
// const { posts, post, postbyByTitleBody } = require("./queries/post")
// const { comments, comment } = require("./queries/comments")
// // Import mutations

 const { register, login, updateCredits } = require("./mutations/user")
// const { addPost, updatePost, deletePost } = require("./mutations/post")
// const { addComment, updateComment, deleteComment } = require("./mutations/comment") 


// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, ringtone, ringtones, searchRingtones},
})

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    updateCredits,
  },
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
