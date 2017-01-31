import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../types/UserType';
import { registerUser, getUserByID } from '../../services/googleDataStore/user';

const loginMutation = mutationWithClientMutationId({
  name: 'login',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: {
      type: GraphQLBoolean
    },
    photo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    facebookToken: {
      type: GraphQLString
    },
    googleToken: {
      type: GraphQLString
    }
  },
  outputFields: {
    user: {
      type: UserType
    },
    accessToken: {
      type: GraphQLString
    }
  },

  mutateAndGetPayload: async (input) => {
    console.log('loginMutation', input);
    const accessToken = toGlobalId('Token', input.id);
    let user = await getUserByID(input.id);
    if (!user) {
      const data = {
        id: input.id,
        email: input.email,
        name: input.name,
        author: input.author || false,
        photo: input.photo,
        googleToken: input.googleToken,
        facebookToken: input.facebookToken,
      };
      user = await registerUser(data);
    }
    return {
      user,
      accessToken: user ? accessToken : null
    };
  }
});
export default loginMutation;
