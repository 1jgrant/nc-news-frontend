import React, { Component } from 'react';

class CommentAdder extends Component {
  state = {
    comment: {},
    currentUser: '',
  };
  render() {
    return <h1>Comment Adder</h1>;
  }
}

export default CommentAdder;
