import React, { Component } from 'react';
import styled from 'styled-components';
import * as API from '../API';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  textArea {
    width: 50%;
  }
  button {
    width: 50px;
    background: rgba(0, 128, 0, 0.463);
  }
`;

class CommentAdder extends Component {
  state = {
    body: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const comment = { ...this.state, username: this.props.username };
    API.postComment(comment, this.props.article_id).then((newComment) => {
      this.props.handleAddComment(newComment);
    });
    this.setState({ body: '' });
  };

  handleChange = (event) => {
    this.setState({ body: event.target.value });
  };

  render() {
    return (
      <CommentContainer>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea
              type="text"
              name="body"
              className="commentInput"
              value={this.state.body}
              onChange={this.handleChange}
              required
            ></textarea>
          </label>
          <button type="submit">POST</button>
        </form>
      </CommentContainer>
    );
  }
}

export default CommentAdder;
