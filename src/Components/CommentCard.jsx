import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';
import { Link } from '@reach/router';

const CommentCardContainer = styled.div`
  display: flex;
  background: rgba(79, 127, 195, 0.607);
  margin: 1rem;
  width: 60vw;
`;

const CommentCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommentCardHeader = styled.div``;

const CommentBody = styled.p``;

const CommentCard = (props) => {
  const { comment_id, votes, author, body, since_posted } = props.comment;
  return (
    <CommentCardContainer>
      <Votes comment_id={comment_id} votes={votes} />
      <CommentCardContent>
        <CommentCardHeader>
          <Link className="author" to={`/users/${author}`}>
            <span>{author}</span>
          </Link>
          <span>{since_posted}</span>
          {props.username === author ? (
            <button onClick={() => props.handleDeleteComment(comment_id)}>
              delete
            </button>
          ) : null}
        </CommentCardHeader>
        <CommentBody>{body}</CommentBody>
      </CommentCardContent>
    </CommentCardContainer>
  );
};

export default CommentCard;
