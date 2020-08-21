import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Chat from "./components/pages/Chat";
import Signup from "./components/pages/Signup";
import { auth } from "./components/services/firebase";
import PrivateRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";
import Login from "./components/pages/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Signup}></Route>
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          ></PublicRoute>
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          ></PublicRoute>
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            component={Chat}
          ></PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
