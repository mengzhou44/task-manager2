import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import mutation from '../mutation/signin';
import styles from './signin.module.scss';
import {getGraphQLError } from '../utils/get-graphql-error';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  renderError() {
    if (this.state.error !== '') {
      return <label className={styles.errors}>{this.state.error}</label>;
    }
  }

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const { email, password } = this.state;
          this.props
            .mutate({
              variables: {
                email,
                password
              }
            })
            .then(res => {
              this.setState({
                email: '',
                password: '',
                error: ''
              });
              this.props.history.push('/');
            })
            .catch(res =>  
                this.setState({ error: getGraphQLError(res) })
            );
        }}
      >
        <h3 className={styles.title}>Sign In</h3>
        <div className={styles.field}>
          <label>Email</label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                email: e.target.value
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                password: e.target.value
              })
            }
          />
        </div>
        <div className={styles.field}>{this.renderError()}</div>
        <div className={styles.field}>
          <button className={styles.button} type="submit">
            SIGN IN
          </button>
        </div>
      </form>
    );
  }
}

export default graphql(mutation)(SignIn);
