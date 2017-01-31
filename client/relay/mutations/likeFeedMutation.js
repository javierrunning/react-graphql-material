import Relay from 'react-relay';
import _ from 'lodash';

const fatQuery = Relay.QL`
  fragment on likeFeedPayload {
    feed {
      id
      title
      description
      image
      liked
      likedCount
    }
  }
`;
export default class LikeFeedMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { likeFeed }`;
  }

  getVariables() {
    const { feed } = this.props;
    return { feedId: feed.id, liked: !feed.liked };
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
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        feed: this.props.feed.id
      }
    }];
  }

  getOptimisticResponse() {
    const { feed } = this.props;
    let likedCount = feed.likedCount;
    if (!this.props.feed.liked) {
      likedCount += 1;
    } else {
      likedCount -= 1;
    }
    if (likedCount < 0) {
      likedCount = 0;
    }
    return {
      feed: {
        ...feed,
        liked: !feed.liked,
        likedCount
      }
    };
  }
}
