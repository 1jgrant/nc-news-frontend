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
  width: 100vw;
  .wrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    @media only screen and (min-width: 768px) {
      width: 800px;
    }
    h1 {
      margin: 0.5rem 0 0.5rem 1rem;
    }
    img {
      align-self: center;
      margin: 0.5rem 1rem 0.5rem 0.5rem;
      width: auto;
      max-width: 100%;
      height: auto;
    }
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
    const { single_user } = this.props;
    API.getUser(single_user)
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
    const { username } = this.props;
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
        <div className="wrapper">
          <h1>{user}</h1>
          <img src={avatar_url} alt="user profile" />
        </div>
        <Router>
          <Articles path="*" selectedAuthor={user} username={username} />
        </Router>
      </UserContainer>
    );
  }
}

export default SingleUser;
