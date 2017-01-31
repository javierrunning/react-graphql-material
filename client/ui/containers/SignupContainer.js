import React from 'react';
import Relay from 'react-relay';
import { Grid, Cell, Textfield, Button, Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';
import PageComponent from '../components/PageComponent';
import initFirebase from '../../utils/firebase';
import { SignupMutation } from '../../relay/mutations';
import { commitUpdate } from '../../utils';

export default class SignupContainer extends React.Component {
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
  onSuccess = (result) => {
    const data = {
      id: result.uid,
      name: result.displayName || '',
      email: result.email,
      verified: result.emailVerified || false,
      photo: result.photoURL || '',
    };
    commitUpdate(SignupMutation, data)
      .then((res) => {
        if (res.signup.accessToken) {
          localStorage.setItem('accessToken', res.signup.accessToken);
        }
      });
  };
  onError = (err) => {
    console.log('Signup err', err);
    this.setState({ error: err.message });
  };

  onPress = () => {
    const { email, password } = this.state;
    initFirebase();
    window.firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onSuccess)
      .catch(this.onError);
  };
  onCloseErrorDialog = () => {
    this.setState({ error: '' });
  };
  render() {
    const { error } = this.state;
    return (
      <PageComponent heading='Signup'>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }}>
              <Cell col={12}>
                <Textfield onChange={this.onChangeUserName} label='Email' />
              </Cell>
              <Cell col={12}>
                <Textfield onChange={this.onChangePassword} label='Password' type='password' />
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary onClick={this.onPress} href='#'>Sign up</Button>
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
