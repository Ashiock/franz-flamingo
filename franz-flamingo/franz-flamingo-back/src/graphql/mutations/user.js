const { UserType } = require('../types')
const { User } = require('../../models')
const { GraphQLString } = require('graphql')
const { createJwtToken } = require('../../middleware/auth')
const { user, users } = require('../queries/user')
const { argsToArgsConfig } = require('graphql/type/definition')

const register = {
    type: GraphQLString,
    description: "Register new user",
    args: {
        username: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        img: { type: GraphQLString },
        credits: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        console.log(args);
        const { username, firstname, lastname, password, img, email, credits } = args
        const userData = new User({ username, firstname, lastname, password, email, img, credits })
        console.log(userData);
        await userData.save()
        const token = createJwtToken({
            "_id": userData._id,
        })
        context.res.cookie("token", token)
        return token
    },
}

const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        const userData = await User.findOne({ username: args.username }).select("+password")
        if (!userData || args.password !== userData.password) {
            throw new Error("Invalid credentials")
        }
        const token = createJwtToken({
            "_id": userData._id,
        })
        context.res.cookie("token", token)
        return token
    },
}

const updateCredits = {
    type: UserType,
    description: "Update user credits",
    args: {
        credits: { type: GraphQLString },
        id: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        var x = args.credits
    switch (x) {
        case "1":
            args.credits = "20";
            break;
        case "2":
            args.credits = "85" ;
            break;
        case "3":
            args.credits = "250" ;
            break;
        default:
            args.credits = "0";
            break;
}       
        var y = await User.findById(args.id);
        var z = y.credits;
        args.credits = (parseInt(args.credits) + parseInt(z));     
        args.credits = args.credits.toString();
        
        const userUpdate = await User.findOneAndUpdate(
            { 
                _id: args.id,
            },
            args,
            { new: true, runValidators: true, })
        if (!userUpdate) {
            throw new Error("No existe usuario con este id ")
        }
        return userUpdate
    },
}


module.exports = {
    register,
    login,
    updateCredits,
}
