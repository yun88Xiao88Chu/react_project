import React, { Component } from 'react'

import Admin from "./comtainers/Admin/Admin";
import Login from "./comtainers/Login/Login";
import {Route,Switch,Redirect} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Switch>
         <Route path='/login' component={Login}/>
         <Route path='/admin' component={Admin}/>
         <Redirect to='/login'/>
      </Switch>  
    )
  }
}
