import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import mutation from '../mutation/sign-out';
import { setAuthenticated } from '../actions/index';
import styles from './header.module.scss';

function Header(props) {
  const dispatch = useDispatch();
  const [logout] = useMutation(mutation);
  const auth = useSelector(state => state.auth);

  const renderButtons = () => {
    if (auth.authenticated === false) {
      return (
        <ul>
          <li className={styles.link}>
            <Link to="/signup">Sign up</Link>
          </li>
          <li className={styles.link}>
            <Link to="/signin">Log in</Link>
          </li>
        </ul>
      );
    }

    return (
      <ul>
        <li className={styles.link}>
          <a
            onClick={() => {
              logout().then(() => {
                dispatch(setAuthenticated(false));
                props.history.push('/');
              });
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div className={styles.box}>
        <Link to="/">Home</Link>
        <div>{renderButtons()}</div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
