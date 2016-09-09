import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router'

import App from './App';
import Home from './Home';
import List from './List';
import Create from './Create';

import './index.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="list" component={List} />
            <Route path="create" component={Create} />
        </Route>
    </Router>
), document.getElementById('root'))
