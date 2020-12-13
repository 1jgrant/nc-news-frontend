import React, { Component } from 'react';
import styled from 'styled-components';
import * as API from '../API';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  form {
    display: flex;
    flex-direction: column;
  }
  textArea {
    width: 80vw;
    height: 3em;
    border: solid 1px rgba(110, 110, 110, 0.607);
    border-radius: 3px;
  }
  button {
    align-self: flex-end;
    margin: 2px 0 0 0;
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
    const { username } = this.props;
    return (
      <CommentContainer>
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            name="body"
            className="commentInput"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder={`Join the conversation ${username}...`}
            required
          ></textarea>
          <button type="submit">POST</button>
        </form>
      </CommentContainer>
    );
  }
}

export default CommentAdder;
