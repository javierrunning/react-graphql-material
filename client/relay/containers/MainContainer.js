import Relay from 'react-relay';
import MainContainer from '../../ui/containers/MainContainer';

export default Relay.createContainer(MainContainer, {
  initialVariables: {
    offsetFeed: 0,
    limitFeed: 0,
    queryFeed: JSON.stringify([]),
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType {
        user {
          id
          name
          email
          photo
          followingAuthors {
            id
            name
            email
            photo
            following
            followedCount
          }
        }
        categories {
          type
          image
        }
        feeds(offset: $offsetFeed, limit: $limitFeed, query: $queryFeed) {
          id
          items {
            id
            title
            description
            image
            likedCount
            liked
            createdBy
          }
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
        }
      }`
  }
});
