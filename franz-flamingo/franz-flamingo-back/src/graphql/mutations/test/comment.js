const { UserType ,PostType , CommentType} = require("../types")
const { User, Post, Comment } = require("../../models")
const { GraphQLString } = require("graphql")

const addComment = {
    type: CommentType,
    description: "Create a new comment on the blog post",
    args: {
        comment: { type: GraphQLString },
        postId: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser ) {
          throw new Error("Unauthorized")
        }
        console.log(context.req.verifiedUser);
        const comment = new Comment({
            userId: context.req.verifiedUser._id,
            postId: args.postId,
            comment: args.comment,
        })
        return comment.save()
    },
}

const updateComment = {
    type: CommentType,
    description: "Update blog comment",
    args: {
        id: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser ) {
          throw new Error("Unauthorized")
        }
        const commentUpdated = await Comment.findOneAndUpdate(
            {
                _id: args.id,
                userId: verifiedUser._id,
            },
            { comment: args.comment },
            {
                new: true,
                runValidators: true,
            }
        )

        if (!commentUpdated) {
            throw new Error("No comment with the given ID found for the author")
        }

        return commentUpdated
    },
}

const deleteComment = {
    type: GraphQLString,
    description: "Delete comment",
    args: {
        commentId: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser ) {
          throw new Error("Unauthorized")
        }
        const commentDeleted = await Comment.findOneAndDelete({
            _id: args.commentId,
            userId: verifiedUser._id,
        })
        if (!commentDeleted) {
            throw new Error("No post with the given ID found for the author")
        }

        return "Post deleted"
    },
}

module.exports = {
    addComment,
    updateComment,
    deleteComment,
  }
  