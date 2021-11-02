const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql")

const { User, Ringtone , Download, Suscription } = require("../models")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    credits: { type: GraphQLString },
  }),
});

const RingtoneType = new GraphQLObjectType({
  name: "Ringtone",
  description: "Ringtone type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    link: { type: GraphQLString },
    owner:{
      type:UserType,
      resolve(parent, args) {
        return User.findById(parent.owner)
      }
    },
    downloads: { type: GraphQLString },
  }),
});

const DownloadType = new GraphQLObjectType({
  name: "Ringtone",
  description: "Ringtone type",
  fields: () => ({
    id: { type: GraphQLID },
    ringtone_id:{
      type:RingtoneType,
      resolve(parent, args) {
        return Ringtone.findById(parent.ringtone_id)
      }
    },
    user_id:{
      type:UserType,
      resolve(parent, args) {
        return User.findById(parent.user_id)
      }
    },
  }),
});

const SuscriptionType = new GraphQLObjectType({
  name: "Suscription",
  description: "Suscription type",
  fields: () => ({
    id: { type: GraphQLID },
    ringtone_id:{
      type:RingtoneType,
      resolve(parent, args) {
        return Ringtone.findById(parent.ringtone_id)
      }
    },
    user_id:{
      type:UserType,
      resolve(parent, args) {
        return User.findById(parent.user_id)
      }
    },
  }),
});

module.exports = {
  UserType,
  RingtoneType,
  DownloadType,
  SuscriptionType,
}
