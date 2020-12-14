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
  justify-content: center;
  width: 100vw;
  min-height: 6vh;
  background-color: rgb(237, 246, 249);
  .headerContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    min-height: 6vh;
    max-width: 850px;
  }

  .headerOptions {
    display: flex;
  }
  .link {
    text-decoration: none;
  }
  .home {
    justify-self: start;
    background: transparent;
    color: rgb(0, 109, 119);
    h1 {
      font-size: 2em;
      margin: 2px 5px 2px 5vw;
    }
  }

  .post {
    justify-self: end;
    font-size: 1.5em;
    color: rgb(0, 109, 119);
    margin: 0 0.5em 0 0.5em;
  }
`;

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
          <section className="headerContent">
            <Link className="link home" to="/">
              <h1 onClick={this.handleHome}>NCN</h1>
            </Link>
            <section className="headerOptions">
              <Topics topic={topic} updateTopic={this.updateTopic} />
              <Link
                className="link"
                to={`/submit`}
                state={{ linkedFrom: topic }}
              >
                <FontAwesomeIcon className="post" icon={faEdit} />
              </Link>
              <Users
                className="users"
                username={username}
                updateUser={this.updateUser}
              />
            </section>
          </section>
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
