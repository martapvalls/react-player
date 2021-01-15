import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

    return (
        <Router>
            <Provider store={store}>
              <Header />

                <Switch>

                    <Route exact path="/" component={Main} />

                    <Route exact path="/login" component={Login} /> 
                </Switch>

            </Provider>
        </Router>
    );
}

export default App;
