import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } from 'graphql';
import { nodeInterface } from '../nodeInterface';

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'A author who is followed by current login user',
  fields: () => ({
    id: globalIdField('Author'),
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
    following: {
      type: GraphQLString,
      description: 'following status for current author'
    },
    followedCount: {
      type: GraphQLString,
      description: 'following users count for current author'
    },
    category: {
      type: GraphQLString,
      description: 'following users count for current author'
    }
  }),
  interfaces: [nodeInterface],
});

const AuthorsType = new GraphQLObjectType({
  name: 'Authors',
  description: 'Authors Information',
  fields: () => ({
    id: globalIdField('Authors'),
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'all authors list',
      resolve: result => result.authors
    }
  }),
  interfaces: [nodeInterface],
});
export default AuthorsType;
