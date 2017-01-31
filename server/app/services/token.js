export function getAccessTokenFromHeader(request) {
  let result = null;
  if (request.headers && request.headers.authorization) {
    result = request.headers.authorization;
    result = result.replace('Bearer ', '');
  }
  return result;
}
