import React from 'react';
import styled from 'styled-components';
import Votes from '../../Votes';
import '../../../App.css';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
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
  align-items: center;
  .trashIcon {
    pointer-events: none;
  }
  button{
    font-size: 0.7rem;
    color: rgb(0, 109, 119);
    border: 1px solid rgb(0, 109, 119);
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
            <Button
              size='sm'
              variant='outline-info'
              onClick={() => props.handleDeleteComment(comment_id)}
            >
              <FontAwesomeIcon className="trashIcon" icon="trash" />
            </Button>
          ) : null}
        </CommentCardHeader>
        <CommentBody>{body}</CommentBody>
      </CommentCardContent>
    </CommentCardContainer>
  );
};

export default CommentCard;
