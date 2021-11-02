const { UserType, PostType, CommentType } = require("../../types")
const { User, Post, Comment } = require("../../../models")
const { GraphQLString } = require("graphql")
const { createJwtToken } = require("../../../middleware/auth")

const register = {
    type: GraphQLString,
    description: "Register new user",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        const { username, email, password, displayName } = args
        const user = new User({ username, email, password, displayName })

        await user.save()
        const token = createJwtToken({
            "_id": user._id,
            "username": user.username,
            "displayName": user.displayName,
        })
        context.res.cookie("token", token)
        return token
    },
}

const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        const user = await User.findOne({ email: args.email }).select("+password")
        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }
        const token = createJwtToken({
            "_id": user._id,
            "username": user.username,
            "displayName": user.displayName,
        })
        //context.res.set('cookieToken', process.env.JWT_SECRET);
        // context.res.cookies('cookieToken', process.env.JWT_SECRET)
        //console.log(context.res.cookie)
        context.res.cookie("token", token)
        return token
    },
}


module.exports = {
    register,
    login,
}
