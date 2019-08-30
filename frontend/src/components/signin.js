import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import mutation from '../mutation/sign-in';

import styles from './signin.module.scss';
import { useDispatch } from 'react-redux';
import { onSignInSuccess } from '../actions/index';
import { getGraphQLError } from '../utils/get-graphql-error';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signIn] = useMutation(mutation);
  const dispatch = useDispatch();

  const renderError = () => {
    return <label className={styles.errors}> {error} </label>;
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        signIn({
          variables: {
            email,
            password
          }
        })
          .then(res => {
            const { token } = res.data.signIn;
            dispatch(onSignInSuccess(token));
            setEmail('');
            setPassword('');
            props.history.push('/dashboard');
          })
          .catch(res => {
            setError(getGraphQLError(res));
          });
      }}
    >
      <h3 className={styles.title}>Sign In</h3>
      <div className={styles.field}>
        <label>Email</label>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label>Password</label>
        <input type="text" onChange={e => setPassword(e.target.value)} />
      </div>
      <div className={styles.field}>{renderError()}</div>
      <div className={styles.field}>
        <button className={styles.button} type="submit">
          SIGN IN
        </button>
      </div>
    </form>
  );
}

export default SignIn;
