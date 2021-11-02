const { DownloadType} = require('../types')
const { Download} = require('../../models')
const { GraphQLString } = require('graphql')

const addDownload = {
    type: DownloadType,
    description: "Download new suscription",
    args: {
        image_id: { type: GraphQLString },
        user_id: { type: GraphQLString },
    },
    resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const DownloadAdd = new Download(args);
        return DownloadAdd.save()
    },
}

const updateDownload = {
    type: DownloadType,
    description: "Update Download",
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        type: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const DownloadUpdated = await Download.findOneAndUpdate(
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

        if (!DownloadUpdated) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return DownloadUpdated
    },
}

const deleteDownload = {
    type: DownloadType,
    description: "Delete Download",
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        if (!context.req.verifiedUser) {
            throw new Error("Unauthorized")
        }
        const DownloadDeleted = await Download.findOneAndDelete({
            _id: args.id,
        })
        if (!DownloadDeleted) {
            throw new Error("No Chat with the given ID found for the author")
        }

        return "Download deleted"
    },
}


module.exports = {
    addDownload,
    updateDownload,
    deleteDownload,
}
