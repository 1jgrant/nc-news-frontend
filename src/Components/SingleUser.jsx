import React, { Component } from 'react';
import Loader from './Loader';
import Articles from './Articles';
import { Router } from '@reach/router';
import * as API from '../API';

class SingleUser extends Component {
  state = {
    user: '',
    avatar_url: '',
    isLoading: true,
  };

  componentDidMount() {
    const { username } = this.props;
    API.getUser(username).then((user) => {
      this.setState({
        user: user.username,
        avatar_url: user.avatar_url,
        isLoading: false,
      });
    });
  }

  render() {
    console.log('singleUser>>', this.props);
    const { user, avatar_url, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div>
        <h1>{user}</h1>
        <img src={avatar_url} alt="user profile" />
        <Router>
          <Articles path="*" selectedAuthor={user} />
        </Router>
      </div>
    );
  }
}

export default SingleUser;
