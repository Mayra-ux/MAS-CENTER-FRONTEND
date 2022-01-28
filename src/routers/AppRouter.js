import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () =>{

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( startChecking())
  }, [dispatch])

  const {checking, uid } = useSelector(state => state.auth);  
  
  if ( checking ) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
            
        </div>
      </div>);
  }
  return(
    <Router>
      <div>
      <HashRouter>
        <Switch>
          <PublicRoute
            exact 
            path="/login" 
            component={LoginScreen} 
            isAuthenticated={!!uid}/>
          <PrivateRoute  path="/*" component={DashboardRoutes} isAuthenticated={!!uid}/>
          <Redirect to="/" />  
        </Switch>
      </HashRouter>
        
      </div>
    </Router>
  )
}