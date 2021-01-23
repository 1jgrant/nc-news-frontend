import React, { Component } from 'react';
import styled from 'styled-components';
import * as API from '../../../API';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const PostButton = styled(Button)`
  align-self: flex-end;
  background: rgb(0, 109, 119);
  border: 2px solid rgb(0, 109, 119);
  margin: 2px 0 0 0;
`

const StyledFormControl = styled(Form.Control)`
  width: 80vw;
  height: 3em;
  border: solid 1px rgba(110, 110, 110, 0.607);
  border-radius: 3px;
`

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
        <Form onSubmit={this.handleSubmit}>
          <StyledFormControl 
          as='textarea' 
          rows={2}
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
            placeholder={`Join the conversation ${username}...`}
            required
          />
          <PostButton size='sm' type="submit">POST</PostButton>
        </Form>
      </CommentContainer>
    );
  }
}

export default CommentAdder;
