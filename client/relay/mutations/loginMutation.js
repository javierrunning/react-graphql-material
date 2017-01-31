import Relay from 'react-relay';

const fatQuery = Relay.QL`
  fragment on loginPayload {
    user {
      id
      email
      name
      photo
    }
    accessToken
  }
`;
export default class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { login }
    `;
  }

  getVariables() {
    const { email, name, photo, id, facebookToken, googleToken } = this.props;
    return { id, email, name, photo, facebookToken, googleToken };
  }

  getFatQuery() {
    return fatQuery;
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        fatQuery
      ],
    }];
  }
}
