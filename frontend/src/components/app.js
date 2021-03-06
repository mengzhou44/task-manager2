import React, {Component} from 'react';
 
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import Dashboard from './dashboard';
import Home from './home';
import SignIn from './signin';
import SignUp from './signup';
import Header from './header';
 
 
const history = createBrowserHistory();
 
class App extends Component {
   render() {
    return (
        <div className="App">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
     
    );
   }
}
 
export default App;

 

