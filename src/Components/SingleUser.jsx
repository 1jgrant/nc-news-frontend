import React, { Component } from 'react';
import Loader from './Loader';
import * as API from '../API';

class SingleUser extends Component {
  state = {
    username: '',
    avatar_url: '',
    isLoading: true,
  };

  componentDidMount() {
    const { username } = this.props;
    API.getUser(username).then((user) => {
      this.setState({
        username: user.username,
        avatar_url: user.avatar_url,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {}

  render() {
    console.log(this.props);
    const { username, avatar_url, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div>
        <h1>{username}</h1>
        <img src={avatar_url} alt="user profile" />
      </div>
    );
  }
}

export default SingleUser;
