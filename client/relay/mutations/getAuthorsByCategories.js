import Relay from 'react-relay';

const fatQuery = Relay.QL`fragment on getAuthorsByCategoriesPayload {
  authors {
    id
    name
    email
    photo
    following
    followedCount
  }
}`;
export default class GetAuthorsByCategoriesMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { getAuthorsByCategories }
    `;
  }

  getVariables() {
    const { categoryTypes } = this.props;
    return { categoryTypes };
  }

  getFatQuery() {
    return fatQuery;
  }
  getConfigs() {
    const ret = [{
      type: 'REQUIRED_CHILDREN',
      children: [fatQuery],
    }];
    return ret;
  }

  getOptimisticResponse() {
  }
}
