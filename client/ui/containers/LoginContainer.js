/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import {
  Grid, Cell, Textfield, Button, Checkbox, Dialog, DialogTitle, DialogActions, DialogContent
} from 'react-mdl';
import { browserHistory } from 'react-router';
import initFirebase from '../../utils/firebase';
import PageComponent from '../components/PageComponent';
import styles from '../styles/containers/LoginContainer.scss';
import { LoginMutation } from '../../relay/mutations';
import { commitUpdate } from '../../utils';
import refreshRelayNetwork from '../../relay/refreshRelayNetwork';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  onChangeUserName = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onError = (err) => {
    console.log('Signup err', err);
    this.setState({ error: err.message });
  };

  onSuccess = (result, token) => {
    const data = {
      id: result.uid,
      name: result.displayName || '',
      email: result.email,
      verified: result.emailVerified || false,
      photo: result.photoURL || '',
    };
    if (token) {
      data.facebookToken = token.facebookToken || '';
      data.googleToken = token.googleToken || '';
    }
    commitUpdate(LoginMutation, data)
      .then((res) => {
        if (res.login.accessToken) {
          localStorage.setItem('accessToken', res.login.accessToken);
          localStorage.setItem('forceFetch', true);
          refreshRelayNetwork(res.login.accessToken);
          browserHistory.push('/');
        }
      });
  };

  onPress = () => {
    const { email, password } = this.state;
    initFirebase();
    window.firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onSuccess)
      .catch(this.onError);
  };
  onCloseErrorDialog = () => {
    this.setState({ error: '' });
  };
  onResetPassword = () => {
    const { email } = this.state;
    initFirebase();
    window.firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.setState({ error: 'Password reset confirmation sent. Please check your email.' }))
      .catch(this.onError);
  };
  onFacebookLogin = () => {
    initFirebase();
    const provider = new window.firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.setCustomParameters({
      display: 'popup'
    });
    window.firebase.auth().signInWithPopup(provider)
      .then(result => this.onSuccess(result.user, { facebookToken: result.credential.accessToken }))
      .catch(this.onError);
  };

  onGoogleLogin = () => {
    initFirebase();
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      login_hint: 'user@example.com'
    });
    window.firebase.auth().signInWithPopup(provider)
      .then(result => this.onSuccess(result.user, { googleToken: result.credential.accessToken }))
      .catch(this.onError);
  };
  render() {
    const { error } = this.state;
    return (
      <PageComponent heading='Login'>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }}>
              <Cell col={12}>
                <Textfield onChange={this.onChangeUserName} label='Email' />
              </Cell>
              <Cell col={12}>
                <Textfield onChange={this.onChangePassword} label='Password' type='password' />
              </Cell>
              <Cell col={12}>
                <Checkbox label='Remember me' ripple style={{ textAlign: 'right' }} />
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary onClick={this.onResetPassword} href='#'>Reset Password</Button>
                <Button primary onClick={this.onPress} href='#'>Login</Button>
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button className={styles.facebook} raised ripple onClick={this.onFacebookLogin} href='#'>
                  Login with Facebook
                </Button>
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button className={styles.gmail} raised ripple onClick={this.onGoogleLogin} href='#'>
                  Login with Google
                </Button>
              </Cell>
            </form>
          </Grid>

          <Dialog open={error.length > 0}>
            <DialogTitle>Information</DialogTitle>
            <DialogContent>
              <p>{error}</p>
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={this.onCloseErrorDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </PageComponent>
    );
  }
}
