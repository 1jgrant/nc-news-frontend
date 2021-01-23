import React, { Component } from 'react';
import * as API from '../../../API';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const UserSelect = styled.form`
  select {
    width: 70px;
    margin: 0 5vw 0 0;
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

  handleChange = (event) => {
    const newUser = this.state.users.filter(
      (user) => user.username === event.target.value
    )[0];
    this.props.updateUser(newUser);
    this.setState({ currentUser: newUser });
  };

  render() {
    return (
      <UserSelect>
        <Form.Control as='select' size='sm' onChange={this.handleChange}>
          {this.state.users.map((user) => {
            return (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </Form.Control>
      </UserSelect>
    );
  }
}

export default Users;
