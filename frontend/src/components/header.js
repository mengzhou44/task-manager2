import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
 
import { onSignOutSuccess } from '../actions/index';
import styles from './header.module.scss';

function Header(props) {
  const dispatch = useDispatch();
 

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
      
                dispatch(onSignOutSuccess());
                props.history.push('/');
              
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
