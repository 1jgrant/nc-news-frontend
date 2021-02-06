import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './Components/Screens/Topics/Topics';
import Users from './Components/Screens/Users/Users';
import Articles from './Components/Screens/Articles/Articles';
import SingleArticle from './Components/Screens/Articles/SingleArticle';
import SingleUser from './Components/Screens/Users/SingleUser';
import ArticleAdder from './Components/Screens/Articles/ArticleAdder';
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
  align-items: center;
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
    @media only screen and (min-width: 768px) {
      width: 800px;
    }
  }
  .headerOptions {
    display: flex;
    align-items: center;
  }
  .link {
    text-decoration: none;
  }
  .home {
    justify-self: start;
    background: transparent;
    color: rgb(0, 109, 119);
    h1 {
      font-weight: bold;
      font-size: 2.8em;
      margin: 0px 0px 0px 1rem;
    }
  }
  .post {
    justify-self: end;
    font-size: 2em;
    color: rgb(0, 109, 119);
    margin: 0 0.5em 0 0.5em;
  }
`;

class App extends Component {
  state = {
    topic: 'all',
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
    this.setState({ topic: 'all' });
  };

  render() {
    const { topic } = this.state;
    const username = this.state.currentUser.username;
    return (
      <div className="App">
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
          <SingleUser path="/users/:single_user/*" username={username} />
        </Router>
      </div>
    );
  }
}

export default App;
