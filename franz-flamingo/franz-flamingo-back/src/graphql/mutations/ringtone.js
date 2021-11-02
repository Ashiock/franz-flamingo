const { RingtoneType} = require('../types')
const { Ringtone} = require('../../models')
const { GraphQLString } = require('graphql')

const addRingtone = {
    type: RingtoneType,
    description: "Ringtone new suscription",
    args: {
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        link: { type: GraphQLString },
        owner: { type: GraphQLString },
        downloads: { type: GraphQLString },
    },
    resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const RingtoneAdd = new Ringtone(args);
        return RingtoneAdd.save()
    },
}

const updateRingtone = {
    type: RingtoneType,
    description: "Update Ringtone",
    args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        link: { type: GraphQLString },
        owner: { type: GraphQLString },
        downloads: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const RingtoneUpdated = await Ringtone.findOneAndUpdate(
            {
                _id: args.id
            },
            args,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!RingtoneUpdated) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return RingtoneUpdated
    },
}

const deleteRingtone = {
    type: RingtoneType,
    description: "Ringtone Ringtone",
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const RingtoneDeleted = await Ringtone.findOneAndDelete({
            _id: args.id,
        })
        if (!RingtoneDeleted) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return "Ringtone deleted"
    },
}


module.exports = {
    addRingtone,
    updateRingtone,
    deleteRingtone,
}
