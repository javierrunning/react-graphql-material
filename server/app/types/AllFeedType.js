import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { nodeInterface } from '../nodeInterface';
import FeedType from '../types/FeedType';
import AuthorsType from '../types/AuthorsType';
import { getAuthorsFromFeed } from '../utils/authors';

const AllFeedsType = new GraphQLObjectType({
  name: 'AllFeeds',
  description: 'All Feeds Information',
  fields: () => ({
    id: globalIdField('AllFeeds'),
    items: {
      type: new GraphQLList(FeedType),
      description: 'all feeds list',
      resolve: result => result.feeds
    },
    authors: {
      type: AuthorsType,
      description: 'author user list',
      resolve: async (result) => {
        let authors = [];
        if (result.userId) {
          authors = await getAuthorsFromFeed(result.feeds, result.userId);
        }
        return { authors };
      }
    }
  }),
  interfaces: [nodeInterface],
});
export default AllFeedsType;
