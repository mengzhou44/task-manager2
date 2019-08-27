import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import query from '../queries/current-user';
import styles from './user.module.scss';
import { getGraphQLError } from '../utils/get-graphql-error';

class Dashboard  extends Component {
  renderUser(user) {
    
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

  renderTasks(user) {
   
    if (user !== undefined) {
      return _.map(user.tasks, item => (
        <li key={item.id}>{item.description}</li>
      ));
    }
  }

  render() {
    const { data, error,  loading } = useQuery(query);

    if (loading === true) {
      return <div>loading...</div>;
    }

    if (error !== undefined) {
      return <h3>{getGraphQLError(error)}</h3>;
    }
    const user = data.user; 

    return (
      <div>
        {this.renderUser(user)}
        <ul className={styles.tasks}>{this.renderTasks(user)}</ul>
      </div>
    );
  }
}

export default Dashboard;
