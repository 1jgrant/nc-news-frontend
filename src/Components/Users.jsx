import React, { Component } from 'react';
import * as API from '../API';

class Users extends Component {
  state = {
    currentUser: { avatar_url: '', name: '', username: '' },
    users: [],
  };

  componentDidMount() {
    API.getUsers().then((users) => {
      this.setState({ users });
    });
  }

  handleChange = (event) => {
    const newUser = this.state.users.filter(
      (user) => user.username === event.target.value
    )[0];
    this.props.updateUser(newUser);
    this.setState({ currentUser: newUser });
  };

  render() {
    //const { avatar_url, name, username } = this.state.currentUser;
    return (
      <div>
        <form>
          <span>Current User</span>
          <select onChange={this.handleChange}>
            <option value="" disabled selected>
              Select User
            </option>
            {this.state.users.map((user) => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </form>
      </div>
    );
  }
}

export default Users;
