import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import User from './user';
import Home from './home';
import SignIn from './signin';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/user/:id" component={User} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
