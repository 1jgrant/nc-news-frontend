import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';
import '../App.css';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentCardContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1vh 2vw 0 0;
`;
const CommentCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 0 1.5vw;
`;
const CommentCardHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .trashIcon {
    pointer-events: none;
  }
`;

const CommentBody = styled.p`
  margin: 1vh 0 1vh 0;
`;

const CommentCard = (props) => {
  const { comment_id, votes, author, body, since_posted } = props.comment;
  return (
    <CommentCardContainer>
      <Votes comment_id={comment_id} votes={votes} />
      <CommentCardContent>
        <CommentCardHeader>
          <span>
            <Link className="link author" to={`/users/${author}`}>
              <b>{author}</b> - {since_posted}
            </Link>
          </span>
          {props.username === author ? (
            <button
              className="delete"
              onClick={() => props.handleDeleteComment(comment_id)}
            >
              <FontAwesomeIcon className="trashIcon" icon="trash" />
            </button>
          ) : null}
        </CommentCardHeader>
        <CommentBody>{body}</CommentBody>
      </CommentCardContent>
    </CommentCardContainer>
  );
};

export default CommentCard;
