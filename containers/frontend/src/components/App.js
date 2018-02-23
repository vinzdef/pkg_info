import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ListingPage from '../pages/ListingPage';
import DetailPage from '../pages/DetailPage';

import {app} from '../styles/components/app.scss';

const App = () =>
    <div className={app}>
        <Switch>
            <Route path="/package/:name" component={DetailPage} />
            <Route path="/" component={ListingPage} />
        </Switch>
    </div>;

export default App;
