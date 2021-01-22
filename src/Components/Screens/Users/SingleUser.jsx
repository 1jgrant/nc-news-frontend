import React, { Component } from 'react';
import Loader from '../../Loader';
import Articles from '../Articles/Articles';
import { Router } from '@reach/router';
import * as API from '../../../API';
import styled from 'styled-components';
import ErrorPage from '../Errors/ErrorPage';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    margin: 1vh 0 1vh 5vw;
  }
  img {
    align-self: center;
    margin: 1vh 2vw 1vh 2vw;
    width: auto;
    max-width: 100%;
    height: auto;
  }
`;

class SingleUser extends Component {
  state = {
    user: '',
    avatar_url: '',
    isLoading: true,
    error: {},
    hasError: false,
  };

  componentDidMount() {
    const { username } = this.props;
    API.getUser(username)
      .then((user) => {
        this.setState({
          user: user.username,
          avatar_url: user.avatar_url,
          isLoading: false,
        });
      })
      .catch((err) => {
        const {
          response: {
            status,
            data: { msg },
          },
        } = err;
        this.setState({
          error: { status, msg },
          hasError: true,
          isLoading: false,
        });
      });
  }

  render() {
    const { user, avatar_url, hasError, error, isLoading } = this.state;
    if (hasError) {
      return <ErrorPage error={error} />;
    }
    if (isLoading) {
      return (
        <UserContainer>
          <Loader />
        </UserContainer>
      );
    }
    return (
      <UserContainer>
        <h1>{user}</h1>
        <img src={avatar_url} alt="user profile" />
        <Router>
          <Articles path="*" selectedAuthor={user} />
        </Router>
      </UserContainer>
    );
  }
}

export default SingleUser;
