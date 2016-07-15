import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from "react-router";
import Login from './Login'
import { loginUser, logoutUser } from '../../../../actions/action'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import api from '../../../../middleware/api'
import desidimeApp from '../../../../reducers/reducer'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(desidimeApp)


export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { dispatch, location, isAuthenticated, errorMessage } = this.props;
    const { collapsed } = this.state;
    const dealClass = location.pathname === "/" ? "active" : "";
    const couponClass = location.pathname.match(/^\/coupon/) ? "active" : "";
    const topicClass = location.pathname.match(/^\/topic/) ? "active" : "";
    const merchantClass = location.pathname.match(/^\/merchant/) ? "active" : "";
    const channelClass = location.pathname.match(/^\/channel/) ? "active" : "";

    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" store={store}>
        
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Quotes App</a>
           <div className='navbar-form'>
           
           {!isAuthenticated &&
             <Login
               errorMessage={errorMessage}
               onLoginClick={ creds => dispatch(loginUser(creds)) }
             />
           }
           
           {isAuthenticated &&
             <Logout onLogoutClick={() => dispatch(logoutUser())} />
           }
         
         </div>
       </div>


      </nav>
    );
  }
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}