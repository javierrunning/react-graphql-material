import Relay from 'react-relay';

const fatQuery = Relay.QL`fragment on followingAuthorPayload {
  authors {
    id
    authors {
      id
      name
      email
      photo
      following
      followedCount
    }
  }
}`;
export default class FollowingAuthorMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { followingAuthor }
    `;
  }

  getVariables() {
    const { authorId, following } = this.props;
    return { authorId, following };
  }

  getFatQuery() {
    return fatQuery;
  }
  getConfigs() {
    const { following } = this.props;
    const ret = [{
      type: 'REQUIRED_CHILDREN',
      children: [fatQuery],
    }];
    return ret;
  }

  getOptimisticResponse() {
  }
}
