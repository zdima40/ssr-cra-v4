import React, { Component } from "react";
//import logo from "./logo.svg";
import Sidebar from "./Sidebar";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";

import { myActions } from "./actions";

class App extends Component {
  render() {
    this.props.myActions();
    return (
      <div className="App">
        <header className="App-header">
          <img src="/logo.svg" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React33221323</h1>
        </header>
        <Sidebar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* {this.props.children} */}
        <Switch>
          <Route path="/one" component={ComponentOne} />
          <Route path="/two" component={ComponentTwo} />
        </Switch>
      </div>
    );
  }
}

export default connect(null, { myActions })(App);
