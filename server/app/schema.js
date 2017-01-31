/* eslint-disable no-unused-vars, no-use-before-define */
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { nodeField } from './nodeInterface';
import ViewerQuery from './queries/ViewerQuery';
import {
  signupMutation,
  loginMutation,
  followingAuthorMutation,
  likeFeedMutation,
  getAuthorsByCategoriesMutation
} from './mutations';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: ViewerQuery
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signup: signupMutation,
    login: loginMutation,
    likeFeed: likeFeedMutation,
    followingAuthor: followingAuthorMutation,
    getAuthorsByCategories: getAuthorsByCategoriesMutation
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
