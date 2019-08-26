import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import Dashboard from './dashboard';
import Home from './home';
import SignIn from './signin';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/Dashboard/:id" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
