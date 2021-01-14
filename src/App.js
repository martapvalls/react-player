import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//components
import Header from './components/Header/Header';
import Login from './components/Login/Login';

function App() {
    let token
    return (
        <Router>
              <Header />

              <Switch>
                  <Route exact path="/">
                      {!token && <Redirect to="/login" />}
                  </Route>
                  <Route exact path="/login" component={Login}/>
                
                  

              </Switch>
        </Router>
    );
}

export default App;
