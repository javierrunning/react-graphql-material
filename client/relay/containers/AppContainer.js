import Relay from 'react-relay';
import App from '../../ui/containers/App';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType {
        user {
          name,
          email
        }
      }`
  }
});
