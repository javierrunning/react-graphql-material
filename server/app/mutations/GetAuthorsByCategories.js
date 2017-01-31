import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql';
import { runUserQuery } from '../../services/googleDataStore/user';
import { AuthorType } from '../types/AuthorsType';

const getAuthorsByCategories = mutationWithClientMutationId({
  name: 'getAuthorsByCategories',
  inputFields: {
    categoryTypes: {
      type: new GraphQLList(GraphQLString)
    },
  },
  outputFields: {
    authors: {
      type: new GraphQLList(AuthorType),
    },
  },

  mutateAndGetPayload: async (input, { request }) => {
    let authors = [];
    const categoryTypes = input.categoryTypes || [];
    try {
      for (let index = 0; index < categoryTypes.length; index++) {
        const users = await runUserQuery([{
          fieldName: 'category',
          condition: '=',
          value: categoryTypes[index]
        }]);
        authors = authors.concat(users);
      }
    } catch (err) {
      console.log('getAuthorsByCategories err', err);
    }
    console.log('getAuthorsByCategories result', authors);
    return {
      authors
    };
  }
});
export default getAuthorsByCategories;
