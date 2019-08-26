import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import query from '../queries/fetch-user';
import styles from './user.module.scss';
import { getGraphQLError } from '../utils/get-graphql-error';

class Dashboard  extends Component {
  renderUser() {
    const { user } = this.props.data;

    if (user !== undefined) {
      return (
        <div>
          <div className={styles.field}>
            <label>First Name </label>
            <div>{user.firstName}</div>
          </div>
          <div className={styles.field}>
            <label>Last Name </label>
            <div>{user.lastName}</div>
          </div>
          <div className={styles.field}>
            <label>Email </label>
            <div>{user.email}</div>
          </div>
          <div className={styles.field}>
            <label>Phone </label>
            <div>{user.phone}</div>
          </div>
        </div>
      );
    }
  }

  renderTasks() {
    const { user } = this.props.data;
    if (user !== undefined) {
      return _.map(user.tasks, item => (
        <li key={item.id}>{item.description}</li>
      ));
    }
  }

  render() {
    if (this.props.data.loading === true) {
      return <div>loading...</div>;
    }

    const { error } = this.props.data;
    if (error !== undefined) {
      return <h3>{getGraphQLError(error)}</h3>;
    }

    return (
      <div>
        {this.renderUser()}
        <ul className={styles.tasks}>{this.renderTasks()}</ul>
      </div>
    );
  }
}

export default graphql(query, {
  options: props => {
    const id = props.match.params.id;
    return { variables: { id: parseInt(id) } };
  }
})(Dashboard);
