import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';
import { getAccessTokenFromHeader } from '../services/token';
import { followingUser } from '../../services/googleDataStore/followUser';
import { updateFollowedCounter } from '../../services/googleDataStore/user';
import { runFeedQuery } from '../../services/googleDataStore/feed';
import AuthorsType from '../types/AuthorsType';
import { getAuthorsFromFeed } from '../utils/authors';

const followingAuthorMutation = mutationWithClientMutationId({
  name: 'followingAuthor',
  inputFields: {
    authorId: {
      type: GraphQLString
    },
    following: {
      type: GraphQLBoolean
    },
    query: {
      type: GraphQLString
    },
    offset: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
  },
  outputFields: {
    authors: {
      type: AuthorsType,
    },
  },

  mutateAndGetPayload: async (input, { request }) => {
    let authors = [];
    const offset = input.offset || 0;
    const limit = input.limit;
    let query = input.query || JSON.stringify([]);
    query = JSON.parse(query);
    const authorId = fromGlobalId(input.authorId).id;
    const following = input.following;
    console.log('----------Following Author------------', authorId, following);
    try {
      const token = getAccessTokenFromHeader(request);
      if (token) {
        const userId = fromGlobalId(token).id;
        if (userId) {
          // update following information
          await followingUser(userId, authorId, following);
          await updateFollowedCounter(authorId, following);
          // get all authors information
          const feeds = await runFeedQuery(query, offset, limit);
          authors = await getAuthorsFromFeed(feeds, userId);
        }
      }
    } catch (err) {
      console.log('followingAuthor err', err);
    }
    console.log('followingAuthor result', authors);
    return {
      authors: {
        authors
      }
    };
  }
});
export default followingAuthorMutation;
