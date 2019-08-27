import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import mutation from '../mutation/sign-up';
import styles from './signup.module.scss';
import { getGraphQLError } from '../utils/get-graphql-error';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      locale: '',
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
          const {
            firstName,
            lastName,
            email,
            password,
            phone,
            locale
          } = this.state;
          this.props
            .mutate({
              variables: {
                email,
                password,
                firstName,
                lastName,
                phone,
                locale
              }
            })
            .then(res => {
              this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
                locale: '',
                error: ''
              });
              this.props.history.push('/');
            })
            .catch(res => {
              this.setState({ error: getGraphQLError(res) });
            });
        }}
      >
        <h3 className={styles.title}>Sign Up</h3>
        <div className={styles.field}>
          <label>First Name </label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                firstName: e.target.value
              })
            }
          />
        </div>
        <div className={styles.field}>
          <label>Last Name </label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                lastName: e.target.value
              })
            }
          />
        </div>

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
        <div className={styles.field}>
          <label>Phone</label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                phone: e.target.value
              })
            }
          />
        </div>
        <div className={styles.field}>
          <label>Locale</label>
          <input
            type="text"
            onChange={e =>
              this.setState({
                locale: e.target.value
              })
            }
          />
        </div>

        <div className={styles.field}>{this.renderError()}</div>
        <div className={styles.field}>
          <button className={styles.button} type="submit">
            SIGN UP
          </button>
        </div>
      </form>
    );
  }
}

export default graphql(mutation)(SignUp);
