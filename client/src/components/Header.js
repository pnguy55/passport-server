import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import CreditDisplay from './CreditDisplay';

class Header extends Component {
    renderContent() {
        // this auth object actually has our user data
        switch (this.props.auth){
            // if the reducer is still loading
            case null:
                return 'Loading';
            // if there is no user data
            case false:
                return <li><a href='/auth/google'>Login with Google</a></li>;
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <Link className='btn' key='0' to='/surveys'>Dashboard</Link>,
                    <li key='1'><Payments /></li>,
                    <li key='2' style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key='3'><a href='/api/logout'>Logout</a></li>
                ]
                
                
        }
    }
    
    render() {
        return (
            <nav className='deep-purple lighten-1'>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default connect(mapStateToProps)(Header);