import React, { Component } from 'react';
import * as API from '../../../API';
import styled from 'styled-components';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const UserSelect = styled.div`
  .dropdown {
    margin: 0 1em 0 0;
  }
  .dropdown-toggle {
    font-size: 0.8em;
    background: rgb(0, 109, 119);
    border: none;
  }
`;

class Users extends Component {
  state = {
    currentUser: {
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
      name: 'Tom Tickle',
      username: 'tickle122',
    },
    users: [],
  };

  componentDidMount() {
    API.getUsers().then((users) => {
      this.setState({ users });
    });
  }

  handleUserClick = (event) => {
    event.preventDefault();
    const newUser = this.state.users.filter(
      (user) => user.username === event.target.value
    )[0];
    this.props.updateUser(newUser);
    this.setState({ currentUser: newUser });
  };

  render() {
    const { users, currentUser } = this.state;
    return (
      <UserSelect>
        <DropdownButton
          id="user-dropdown"
          size="sm"
          variant="info"
          title={currentUser.username}
        >
          <Dropdown.ItemText>Select a user:</Dropdown.ItemText>
          {users.map((user) => {
            return (
              <Dropdown.Item
                as="button"
                key={user.username}
                value={user.username}
                onClick={this.handleUserClick}
              >
                {user.username}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </UserSelect>
    );
  }
}

export default Users;
