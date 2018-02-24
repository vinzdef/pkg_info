import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './Header';
import ListingPage from '../pages/ListingPage';
import DetailPage from '../pages/DetailPage';

import {app, appContent} from '../styles/components/app.scss';

const App = () =>
    <div className={app}>
        <Header />
        <div className={appContent}>
            <Switch>
                <Route path="/package/:name" component={DetailPage} />
                <Route path="/" component={ListingPage} />
            </Switch>
        </div>
    </div>;

export default App;
