import Relay from 'react-relay';

export default function commitUpdate(Mutation, params) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new Mutation(params), {
      onFailure: reject,
      onSuccess: resolve,
    });
  });
}
