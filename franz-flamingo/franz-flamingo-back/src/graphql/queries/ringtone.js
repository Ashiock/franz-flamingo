const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { UserType,SuscriptionType,RingtoneType } = require('../types');
const { User,Suscription,Ringtone } = require('../../models');

const ringtones = {
    type: new GraphQLList(RingtoneType),
    description: "Retrieves list of ringtone",
    resolve(parent, args) {
        return Ringtone.find()
    },
}
const ringtone = {
    type: RingtoneType,
    description: "Retrieves one ringtones",
    args: { id: { type: GraphQLString } },
    resolve(parent, args, context) {
      if (!context.req.verifiedUser) {
        throw new Error("Unauthorized")
      }
      return Ringtone.findById(args.id)

    },
  }

  const searchRingtones = {
    type: new GraphQLList(RingtoneType),
    description: "Retrieves list of ringtones filtered",
    args: { search: { type: GraphQLString } },
    resolve(parent, args) {
      console.log("llega a search y a el resolve");
      const reg = {$regex: '.*' + args.search + '.*', $options: 'i'};
      const filt = {
        desc: reg
      }
        return Ringtone.find(filt)
    },
}
  
  
  module.exports = { ringtone, ringtones, searchRingtones}