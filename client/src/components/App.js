import React, { Component } from 'react';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';



class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    };
    render() {
        return (
            <div className="container">
                <HashRouter basename='/'>
                    <div className="container">
                        {/* the exact makes sure that it only shows up on that path */}
                        <Header/>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard} />
                        <Route path='/surveys/new' component={SurveyNew} />
                        <Route path='/landing' component={Landing} />
                    </div>
                </HashRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);