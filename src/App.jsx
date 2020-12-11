import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './Components/Topics';
import Users from './Components/Users';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import SingleUser from './Components/SingleUser';
import ArticleAdder from './Components/ArticleAdder';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusSquare,
  faEdit,
  faTrophy,
  faFire,
  faClock,
  faAngleUp,
  faAngleDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(
  faAngleDown,
  faPlusSquare,
  faEdit,
  faTrophy,
  faFire,
  faClock,
  faAngleUp,
  faTrash
);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 6vh;
  background-color: rgb(237, 246, 249);
  .link {
    text-decoration: none;
  }
  .home {
    background: transparent;
    color: rgb(0, 109, 119);
    h1 {
      font-size: 2em;
      margin: 2px 5px 2px 5px;
    }
  }
  .post {
    font-size: 1.5em;
    color: rgb(0, 109, 119);
  }
`;

// const ContentContainer = styled.main`
//   display: flex;
//   justify-content: center;
//   min-height: 90vh;
//   .Router {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     min-height: 600px;
//   }
// `;

class App extends Component {
  state = {
    topic: '',
    currentUser: {
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
      name: 'Tom Tickle',
      username: 'tickle122',
    },
  };

  updateUser = (updatedUser) => {
    this.setState({ currentUser: updatedUser });
  };

  updateTopic = (selectedTopic) => {
    this.setState({ topic: selectedTopic });
  };

  handleHome = () => {
    this.setState({ topic: '' });
  };

  render() {
    const { topic } = this.state;
    const username = this.state.currentUser.username;
    return (
      <body className="App">
        <HeaderContainer>
          <Link className="link home" to="/">
            <h1 onClick={this.handleHome}>NCN</h1>
          </Link>
          <Topics topic={topic} updateTopic={this.updateTopic} />
          <Link className="link" to={`/submit`} state={{ linkedFrom: topic }}>
            <FontAwesomeIcon className="post" icon={faEdit} />
          </Link>
          <Users username={username} updateUser={this.updateUser} />
        </HeaderContainer>
        <Router className="Router">
          <ArticleAdder path="/submit" username={username} />
          <Articles path="/*" username={username} />
          <Articles path="/articles/topics/:topic_name/*" username={username} />
          <SingleArticle path="/articles/:article_id/*" username={username} />
          <SingleUser path="/users/:username/*" username={username} />
        </Router>
      </body>
    );
  }
}

export default App;
