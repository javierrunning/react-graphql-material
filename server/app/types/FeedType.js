import { globalIdField, toGlobalId } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { nodeInterface } from '../nodeInterface';
import UserType from './UserType';

const FeedType = new GraphQLObjectType({
  name: 'Feed',
  description: 'Feed item',
  fields: () => ({
    id: globalIdField('Feed'),
    title: {
      type: GraphQLString,
      description: 'Feed title',
    },
    description: {
      type: GraphQLString,
      description: 'Feed description'
    },
    image: {
      type: GraphQLString,
      description: 'Feed Image path'
    },
    likedCount: {
      type: GraphQLInt,
      description: 'Total like count for current feed',
      resolve: feed => feed.likedCount || 0,
    },
    liked: {
      type: GraphQLBoolean,
      description: 'current user liked status',
      resolve: feed => feed.liked || false,
    },
    createdBy: {
      type: GraphQLString,
      description: 'author user id',
      resolve: feed => toGlobalId('Author', feed.createdBy)
    }
  }),
  interfaces: [nodeInterface],
});

export default FeedType;
