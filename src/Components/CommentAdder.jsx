import React, { Component } from 'react';
import styled from 'styled-components';
import * as API from '../API';

const CommentContainer = styled.form``;

class CommentAdder extends Component {
  state = {
    body: '',
  };

  handleSubmit = (event) => {
    console.log('handleSubmit');
    event.preventDefault();
    const comment = { ...this.state, username: this.props.username };
    API.postComment(comment, this.props.article_id).then((newComment) => {
      this.props.handleAddComment(newComment);
    });
    this.setState({ body: '' });
  };

  handleChange = (event) => {
    console.log('handleChange');
    this.setState({ body: event.target.value });
  };

  render() {
    return (
      <CommentContainer onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            required
          ></input>
        </label>
        <button type="submit">Post Comment</button>
      </CommentContainer>
    );
  }
}

export default CommentAdder;
