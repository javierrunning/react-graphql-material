import React from 'react';
import { browserHistory } from 'react-router';
import 'react-mdl/extra/css/material.orange-deep_orange.min.css';
import 'normalize.css/normalize.css';
import Navbar from '../common/Navbar';
import styles from '../styles/containers/App.scss';
import refreshRelayNetwork from '../../relay/refreshRelayNetwork';

export default class App extends React.Component {
  onLogout = () => {
    browserHistory.push('/login');
    localStorage.setItem('accessToken', '');
    localStorage.setItem('forceFetch', true);
    refreshRelayNetwork('');
    this.props.relay.forceFetch();
  };
  render() {
    const { user } = this.props.viewer;
    return (
      <div className={styles.root}>
        <Navbar user={user} onLogout={this.onLogout} />
        <div className={styles.greeting}>
          <h1 className={styles.saw}>AA Prototype</h1>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
