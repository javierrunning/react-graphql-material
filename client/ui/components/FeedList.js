import React from 'react';
import { Card, CardTitle, Button, CardActions, CardText, IconButton, CardMenu } from 'react-mdl';
import styles from '../styles/components/FeedList.scss';

export default class FeedList extends React.Component {
  getAuthorById(id) {
    const { authors } = this.props.feeds.authors;
    for (let index = 0; index < authors.length; index++) {
      if (authors[index].id === id) {
        return authors[index];
      }
    }
    return null;
  }
  render() {
    const { feeds } = this.props;
    return (
      <div className={styles.container}>
        {feeds.items.map((feed, id) => {
          const author = this.getAuthorById(feed.createdBy);
          return (
            <Card shadow={0} className={styles.feedContainer} key={id}>
              <CardTitle>
                <div className={styles.title}>{feed.title}</div>
              </CardTitle>
              <CardTitle style={{ height: '240px', background: `url(${feed.image}) center / cover` }} />
              <CardText>
                {feed.description}
              </CardText>
              <CardActions border className={styles.headerContainer}>
                {author &&
                <div className={styles.userContainer}>
                  <IconButton
                    name='star_border'
                    style={{ color: '#FF5500' }}
                    onClick={() => this.props.onFollowAuthor(author.id)}
                  />
                  <div className={styles.avatar} style={{ background: `url(${author.photo}) center / cover` }} />
                  <div className={styles.userNameContainer}>
                    <div className={styles.userName}>{author && author.name}</div>
                  </div>
                  <div className={styles.favouriteContainer}>
                    <IconButton
                      name={feed.liked ? 'favorite' : 'favorite_border'}
                      style={{ color: '#00BCD4', marginRight: '5px' }}
                      onClick={() => this.props.onLikeFeed(feed)}
                    />
                    {feed.likedCount}
                  </div>
                </div>
                }
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }
}
