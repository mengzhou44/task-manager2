import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import query from '../queries/current-user';
import mutation from '../mutation/sign-out';
import styles from './header.module.scss';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) return <div />;
    if (user) {
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

export default graphql(query)(graphql(mutation)(Header));
