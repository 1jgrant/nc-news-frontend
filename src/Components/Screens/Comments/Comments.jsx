import React, { Component } from 'react';
import styled from 'styled-components';
import CommentCard from './CommentCard';
import CommentAdder from './CommentAdder';
import Loader from '../../Loader';
import * as API from '../../../API';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
const CommentsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: solid 1px rgb(0, 109, 119);
  width: 90%;
  margin: 2vh 0 0 0;
  padding: 2vh 0 0 0;
  .commentsLoader {
    align-self: center;
  }
  select {
    margin: 0 0 0.5vh 1vw;
  }
`;

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    limit: 1000,
    sort_by: 'created_at',
    order: 'desc',
  };

  componentDidMount() {
    const { sort_by, order } = this.state;
    API.getComments(this.props.article_id, sort_by, order).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (sort_by !== prevState.sort_by || order !== prevState.order) {
      API.getComments(this.props.article_id, sort_by, order).then(
        (comments) => {
          this.setState({ comments, isLoading: false });
        }
      );
    }
  }

  handleAddComment = (newComment) => {
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  handleDeleteComment = (comment_id) => {
    API.deleteComment(comment_id).then(() => {
      this.setState((currentState) => {
        const filteredComments = currentState.comments.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
        return { comments: filteredComments };
      });
    });
  };

  handleSort = (event) => {
    const params = {
      new: { sort_by: 'created_at', order: 'desc' },
      top: { sort_by: 'votes', order: 'desc' },
      old: { sort_by: 'created_at', order: 'asc' },
    };
    this.setState(params[event.target.value]);
  };

  render() {
    return (
      <CommentsContainer>
        <CommentAdder
          article_id={this.props.article_id}
          username={this.props.username}
          handleAddComment={this.handleAddComment}
        />
        <CommentsContent>
          <form onChange={this.handleSort}>
            <label>
              Sort
              <select name="sort" defaultValue="new">
                <option value="new">New</option>
                <option value="top">Top</option>
                <option value="old">Old</option>
              </select>
            </label>
          </form>
          {this.state.isLoading ? (
            <Loader className="commentsLoader" />
          ) : (
            this.state.comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  username={this.props.username}
                  handleDeleteComment={this.handleDeleteComment}
                />
              );
            })
          )}
        </CommentsContent>
      </CommentsContainer>
    );
  }
}

export default Comments;
