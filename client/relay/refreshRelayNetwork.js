import Relay from 'react-relay';

const configName = process.env.NODE_ENV || 'development';
export default function refreshRelayNetwork(token) {
  const url = configName === 'development' ? 'http://172.20.2.70:3000/graphql' : 'https://galvanic-botany-156607.appspot-preview.com/graphql';
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(url, {
      fetchTimeout: 300000,
      retryDelays: [300000],
      headers: {
        Authorization: token
      },
    })
  );
}
