import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './Components/Topics';
import Users from './Components/Users';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: grey;
  h1 {
    color: #000000;
  }
`;

const ContentContainer = styled.main`
  display: flex;
  justify-content: center;
`;

class App extends Component {
  state = {
    topic: 'all',
    username: 'weegembump',
  };
  render() {
    const { topic, username } = this.state;
    return (
      <div>
        <HeaderContainer>
          <Link to="/">
            <h1>NC News</h1>
          </Link>
          <Topics topic={topic} />
          <Users username={username} />
        </HeaderContainer>
        <ContentContainer>
          <Router>
            <Articles path="/" />
            <Articles path="/articles/topics/:topic_name" />
            <SingleArticle path="/articles/:article_id" />
          </Router>
        </ContentContainer>
      </div>
    );
  }
}

export default App;
