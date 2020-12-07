import React, { Component } from "react";
import "./App.css";
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
      </div>
    );
  }
}

export default App;
