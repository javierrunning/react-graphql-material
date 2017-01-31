import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Cell } from 'react-mdl';
import FeedList from '../components/FeedList';
import InitialUserDialog from '../components/InitialUserDialog';
import { LikeFeedMutation, FollowingAuthorMutation } from '../../relay/mutations';
import { commitUpdate } from '../../utils';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      showLoginError: false,
      categoryUsers: []
    };
  }

  componentDidMount() {
    const forceFetch = localStorage.getItem('forceFetch');
    if (!this.props.viewer.user && forceFetch) {
      console.log('forceFetch', forceFetch);
      this.props.relay.forceFetch({}, ({ done }) => {
        if (done) {
          this.setState({ fetching: false });
          localStorage.setItem('forceFetch', false);
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.fetching || !nextState.fetching) {
      if (!nextProps.viewer.user && !this.props.viewer.user) {
        // browserHistory.push('/login');
      }
    }
    return true;
  }
  onFollowAuthor = (authorId) => {
    if (this.checkUser()) {
      const following = false;
      const data = { authorId, following };
      commitUpdate(FollowingAuthorMutation, data)
        .then((res) => {
        });
    }
  };
  onLikeFeed = (feed) => {
    if (this.checkUser()) {
      const data = { feed };
      commitUpdate(LikeFeedMutation, data)
        .then((res) => {
        });
    }
  };
  checkUser() {
    const { user } = this.props.viewer;
    if (!user) {
      this.setState({ showLoginError: true });
      return false;
    }
    return true;
  }
  renderCategoryDialog() {
    const { user, categories } = this.props.viewer;
    if (user && user.followingAuthors.length === 0) {
      return (
        <InitialUserDialog
          {...this.props}
        />
      );
    }
    return <div />;
  }
  render() {
    const { feeds } = this.props.viewer;
    console.log('feeds', this.props.viewer);
    return (
      <div>
        <FeedList
          onFollowAuthor={this.onFollowAuthor}
          onLikeFeed={this.onLikeFeed}
          feeds={feeds}
        />
        <Dialog open={this.state.showLoginError}>
          <DialogTitle>You need to login first</DialogTitle>
          <DialogContent>
            <p>You have to login to like feed or follow user.</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={() => this.setState({ showLoginError: false })}>OK</Button>
          </DialogActions>
        </Dialog>
        {this.renderCategoryDialog()}
      </div>
    );
  }
}
