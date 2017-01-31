import { getFollowingUsers } from '../../services/googleDataStore/followUser';
import { getUsers } from '../../services/googleDataStore/user';

export async function getAuthorsFromFeed(feeds, userId) {
  let authors = [];
  try {
    const allAuthorIds = feeds.map(feed => feed.createdBy);
    const authorIds = allAuthorIds.filter((elem, index, self) => index === self.indexOf(elem));
    authors = await getUsers(authorIds);
    const followingAuthors = await getFollowingUsers(userId, authorIds);
    for (let index = 0; index < authors.length; index++) {
      authors[index].following = false;
      followingAuthors.forEach((followingAuthor) => {
        if (followingAuthor.following && followingAuthor.authorId === authors[index].id) {
          authors[index].following = true;
        }
      });
    }
  } catch (err) {
    console.log('getAuthorsFromFeed err', err);
  }
  return authors;
}
