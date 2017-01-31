import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Cell } from 'react-mdl';
import { GetAuthorsByCategoriesMutation } from '../../relay/mutations';
import { commitUpdate } from '../../utils';
import styles from '../styles/components/InitialUserDialog.scss';

export default class InitialUserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: true,
      selectedTypes: [],
      selectedUsers: [],
      users: []
    };
  }
  onClickCategory(type) {
    let { selectedTypes } = this.state;
    const index = selectedTypes.indexOf(type);
    if (index === -1) {
      selectedTypes = selectedTypes.concat(type);
    } else {
      selectedTypes.splice(index, 1);
    }
    this.setState({ selectedTypes });
  }
  onClickUser(user) {
    let { selectedUsers } = this.state;
    const index = selectedUsers.indexOf(user.id);
    if (index === -1) {
      selectedUsers = selectedUsers.concat(user.id);
    } else {
      selectedUsers.splice(index, 1);
    }
    this.setState({ selectedUsers });
  }
  getAuthorsByCategories = () => {
    const { selectedUsers } = this.state;
    if (selectedUsers.length > 0) {
      this.setState({ showDialog: false });
    } else {
      commitUpdate(GetAuthorsByCategoriesMutation, {
        categoryTypes: this.state.selectedTypes
      }).then((res) => {
        if (res.getAuthorsByCategories.authors.length > 0) {
          this.setState({ users: res.getAuthorsByCategories.authors });
        }
      });
    }
  };
  renderContent(categories) {
    const { selectedTypes, selectedUsers, users } = this.state;
    if (users.length > 0) {
      return users.map((user, index) => {
        const position = selectedUsers.indexOf(user.id);
        let style = null;
        if (position !== -1) {
          style = { border: '3px solid #F50' };
        }
        return (
          <Cell key={index} col={2} onClick={() => this.onClickUser(user)} style={{ position: 'relative' }}>
            <div className={styles.border} style={{ ...style }} />
            <div className={styles.imgCategory} style={{ background: `url(${user.photo}) center / cover` }} />
            <div className={styles.categoryTitle}>{user.name}</div>
          </Cell>
        );
      });
    }
    return categories.map((category, index) => {
      const position = selectedTypes.indexOf(category.type);
      let style = null;
      if (position !== -1) {
        style = { border: '3px solid #F50' };
      }
      return (
        <Cell key={index} col={2} onClick={() => this.onClickCategory(category.type)} style={{ position: 'relative' }}>
          <div className={styles.border} style={{ ...style }} />
          <div className={styles.imgCategory} style={{ background: `url(${category.image}) center / cover` }} />
          <div className={styles.categoryTitle}>{category.type}</div>
        </Cell>
      );
    });
  }
  render() {
    const { categories } = this.props.viewer;
    const { users, showDialog } = this.state;
    return (
      <Dialog open={showDialog} className={styles.dialog}>
        <DialogTitle className={styles.title}>
          {users.length > 0 ? 'Select users' : 'Select categories'}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Grid>
            {this.renderContent(categories)}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='button' onClick={this.getAuthorsByCategories}>
            {users.length > 0 ? 'Finish' : 'Next'}
          </Button>
          {users.length > 0 && <Button type='button' onClick={() => this.setState({ users: [] })}>Back</Button>}
        </DialogActions>
      </Dialog>
    );
  }
}
