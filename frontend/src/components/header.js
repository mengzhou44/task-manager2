import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import query from '../queries/current-user';
import mutation from '../queries/logout';

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
          <li>
            <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/signin">Log in</Link>
        </li>
      </ul>
    );
  }
  render() {
    return (
      <nav>
        <div>
          <Link to="/">
            Home
          </Link>
          <div>{this.renderButtons()}</div>
        </div>
      </nav>
    );
  }
}

export default graphql(query)(graphql(mutation)(Header));
