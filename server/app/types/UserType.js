import { globalIdField, fromGlobalId } from 'graphql-relay';
import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { nodeInterface } from '../nodeInterface';
import { AuthorType } from './AuthorsType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      description: 'user email'
    },
    name: {
      type: GraphQLString,
      description: 'user name'
    },
    author: {
      type: GraphQLBoolean,
      description: 'status for author user',
    },
    photo: {
      type: GraphQLString,
      description: 'user photo url path'
    },
    followingAuthors: {
      type: new GraphQLList(AuthorType),
    }
  }),
  interfaces: [nodeInterface],
});

export default UserType;
