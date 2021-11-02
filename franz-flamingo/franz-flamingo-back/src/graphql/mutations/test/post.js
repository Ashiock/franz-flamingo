const { UserType, PostType, CommentType } = require("../types")
const { User, Post, Comment } = require("../../models")
const { GraphQLString } = require("graphql")
const { authenticate } = require("../../middleware/auth")
const jwt = require("jsonwebtoken")

const addPost = {
  type: PostType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve(parent, args, context) {
    if (!context.req.verifiedUser ) {
      throw new Error("Unauthorized")
    }
    const post = new Post({
      authorId: context.req.verifiedUser._id,
      title: args.title,
      body: args.body,
    })

    return post.save()
  },
}

const updatePost = {
  type: PostType,
  description: "Update blog post",
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    if (!context.req.verifiedUser ) {
      throw new Error("Unauthorized")
    }
    const postUpdated = await Post.findOneAndUpdate(
      {
        _id: args.id,
        authorId: verifiedUser._id,
      },
      { title: args.title, body: args.body },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!postUpdated) {
      throw new Error("No post with the given ID found for the author")
    }

    return postUpdated
  },
}

const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    if (!context.req.verifiedUser ) {
      throw new Error("Unauthorized")
    }
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    })
    if (!postDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Post deleted"
  },
}

module.exports = {
  addPost,
  updatePost,
  deletePost,
}
