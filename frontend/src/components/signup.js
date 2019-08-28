import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import mutation from '../mutation/sign-up';
import styles from './signup.module.scss';
import { getGraphQLError } from '../utils/get-graphql-error';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../actions';

function SignUp(props) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [locale, setLocale] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [signup] = useMutation(mutation);

  const renderError = () => {
    if (error !== '') {
      return <label className={styles.errors}>{error}</label>;
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        signup({
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
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setPhone('');
            setLocale('');
            props.history.push('/dashboard');
            dispatch(setAuthenticated(true));
          })
          .catch(res => setError(getGraphQLError(res)));
      }}
    >
      <h3 className={styles.title}>Sign Up</h3>
      <div className={styles.field}>
        <label>First Name </label>
        <input type="text" onChange={e => setFirstName(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Last Name </label>
        <input type="text" onChange={e => setLastName(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label>Password</label>
        <input type="text" onChange={e => setPassword(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Phone</label>
        <input type="text" onChange={e => setPhone(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Locale</label>
        <input type="text" onChange={e => setLocale(e.target.value)} />
      </div>

      <div className={styles.field}>{renderError()}</div>
      <div className={styles.field}>
        <button className={styles.button} type="submit">
          SIGN UP
        </button>
      </div>
    </form>
  );
}

export default SignUp;
