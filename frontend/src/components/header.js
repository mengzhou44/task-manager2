import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation  } from '@apollo/react-hooks';

import query from '../queries/current-user';
import mutation from '../mutation/sign-out';
import styles from './header.module.scss';

class Header extends Component {

  onLogoutClick() {
    const [logout, {data}] = useMutation(mutation);
    logout({
       refetchQueries: [{ query }]
    })
    .then(() => {
        this.props.history.push('/');
     });
  }

  renderButtons() {
    const { loading,  data } = useQuery(query);
 
    if (loading) return <div />;
    if (data.user) {
      return (
        <ul>
          <li className={styles.link}>
            <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
          </li>
        </ul>
      );
    }
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
  render() {
    return (
      <nav>
        <div className={styles.box}>
          <Link to="/">Home</Link>
          <div>{this.renderButtons()}</div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
