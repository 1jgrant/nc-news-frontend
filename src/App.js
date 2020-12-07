import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/Articles";

class App extends Component {
  state = {
    topic: "all",
    username: "weegembump",
  };
  render() {
    const { topic, username } = this.state;
    return (
      <div>
        <Header topic={topic} username={username} />
        <Router>
          <Articles path="/" />
        </Router>
      </div>
    );
  }
}

export default App;
