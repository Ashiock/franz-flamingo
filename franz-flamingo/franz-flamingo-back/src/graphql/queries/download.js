const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { UserType,SuscriptionType,ImageType ,DownloadType} = require('../types');
const { User,Suscription,Image,Download } = require('../../models');

const downloads = {
    type: new GraphQLList(DownloadType),
    description: "Retrieves list of downloads",
    resolve(parent, args) {
        return Download.find()
    },
}
const download = {
    type: DownloadType,
    description: "Retrieves one download",
    args: { id: { type: GraphQLString } },
    resolve(parent, args, context) {
      if (!context.req.verifiedUser) {
        throw new Error("Unauthorized")
      }
      return Download.findById(args.id)

    },
  }
  
  module.exports = { download, downloads}