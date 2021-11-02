const { UserType, PostType, CommentType } = require("../types")
const { GraphQLList, GraphQLString, GraphQLID } = require("graphql")
const { User, Comment, Post } = require("../../models")

const posts = {
    type: new GraphQLList(PostType),
    description: "Retrieves list of posts",
    resolve() {
        return Post.find()
    },
}

const post = {
    type: PostType,
    description: "Retrieves one post",
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Post.findById(args.id)
    },
}
const postbyByTitleBody = {
    type: new GraphQLList(PostType),
    description: "Retrieves one post",
    args: { authorId: { type: GraphQLString  }
},
    resolve(parent, args) {
        return Post.find(args);
    },
}

module.exports = { posts, post, postbyByTitleBody }
