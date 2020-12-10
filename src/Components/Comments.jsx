import React, { Component } from 'react';
import styled from 'styled-components';
import CommentCard from './CommentCard';
import CommentAdder from './CommentAdder';
import Loader from './Loader';
import * as API from '../API';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(124, 145, 251, 0.819);
  flex-grow: 0;
`;

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    API.getComments(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  handleAddComment = (newComment) => {
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  render() {
    return (
      <CommentsContainer>
        <CommentAdder
          article_id={this.props.article_id}
          username={this.props.username}
          handleAddComment={this.handleAddComment}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          this.state.comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })
        )}
      </CommentsContainer>
    );
  }
}

export default Comments;
