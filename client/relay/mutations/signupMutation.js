import Relay from 'react-relay';

const fatQuery = Relay.QL`
  fragment on signupPayload {
    user {
      id
      email
      name
      photo
    }
    accessToken
  }
`;
export default class SignupMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { signup }
    `;
  }

  getVariables() {
    const { email, name, photo, id } = this.props;
    return { id, email, name, photo };
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
