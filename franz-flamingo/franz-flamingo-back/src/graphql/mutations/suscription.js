const { UserType,SuscriptionType} = require('../types')
const { User,Suscription} = require('../../models')
const { GraphQLString } = require('graphql')

const addSuscription = {
    type: SuscriptionType,
    description: "Create new suscription",
    args: {
        user_id: { type: GraphQLString },
        type: { type: GraphQLString },
    },
    resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const SuscriptionAdd = new Suscription(args);
        return SuscriptionAdd.save()
    },
}

const updateSuscription = {
    type: SuscriptionType,
    description: "Update Chat",
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        type: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const SuscriptionUpdated = await Suscription.findOneAndUpdate(
            {
                _id: args.id
               // users_Chatcode: users_Chatcode,
            },
            args,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!SuscriptionUpdated) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return SuscriptionUpdated
    },
}

const deleteSuscription = {
    type: SuscriptionType,
    description: "Delete Suscription",
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const SuscriptionDeleted = await Suscription.findOneAndDelete({
            _id: args.id,
        })
        if (!SuscriptionDeleted) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return "Suscription deleted"
    },
}


module.exports = {
    addSuscription,
    updateSuscription,
    deleteSuscription,
}
