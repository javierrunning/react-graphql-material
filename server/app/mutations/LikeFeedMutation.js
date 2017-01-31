import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLBoolean } from 'graphql';
import { getAccessTokenFromHeader } from '../services/token';
import { likeFeed } from '../../services/googleDataStore/likeFeed';
import { getUserByID } from '../../services/googleDataStore/user';
import { updateFeedLikeCount } from '../../services/googleDataStore/feed';
import FeedType from '../types/FeedType';

const likeFeedMutation = mutationWithClientMutationId({
  name: 'likeFeed',
  inputFields: {
    feedId: {
      type: GraphQLString
    },
    liked: {
      type: GraphQLBoolean
    }
  },
  outputFields: {
    feed: {
      type: FeedType,
    },
  },

  mutateAndGetPayload: async (input, { request }) => {
    let feed = null;
    const feedId = fromGlobalId(input.feedId).id;
    const liked = input.liked;
    console.log('----------Like feed------------', feedId, liked);
    try {
      const token = getAccessTokenFromHeader(request);
      if (token) {
        const userId = fromGlobalId(token).id;
        if (userId) {
          await likeFeed(userId, feedId, liked);
          feed = await updateFeedLikeCount(feedId, liked);
          feed.liked = liked;
          feed.author = await getUserByID(feed.createdBy);
        }
      }
    } catch (err) {
      console.log('likeFeedMutation err', err);
    }
    console.log('likeFeedMutation result', feed);
    return {
      feed
    };
  }
});
export default likeFeedMutation;
