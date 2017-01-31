import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import UserQuery from '../queries/UserQuery';
import FeedQuery from '../queries/FeedQuery';
import CategoryQuery from '../queries/CategoryQuery';

const ViewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'A viewer object',
  fields: () => ({
    user: UserQuery,
    feeds: FeedQuery,
    categories: CategoryQuery
  })
});

export default ViewerType;
