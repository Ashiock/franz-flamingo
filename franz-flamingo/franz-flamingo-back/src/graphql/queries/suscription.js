const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { UserType,SuscriptionType } = require('../types');
const { User,Suscription } = require('../../models');

const suscriptions = {
    type: new GraphQLList(SuscriptionType),
    description: "Retrieves list of suscriptions",
    resolve(parent, args) {
        return Suscription.find()
    },
}
const suscription = {
    type: SuscriptionType,
    description: "Retrieves one Suscription",
    args: { id: { type: GraphQLString } },
    resolve(parent, args, context) {
      if (!context.req.verifiedUser) {
        throw new Error("Unauthorized")
      }
      return Suscription.findById(args.id)

    },
  }
  
  module.exports = { suscriptions, suscription}