import React, { Component } from 'react'

import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import {Route,Switch,Redirect} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Switch>
         <Route to='/login' component={Login}/>
         <Route to='/admin' component={Admin}/>
         <Redirect to='/login'/>
      </Switch>  
    )
  }
}
