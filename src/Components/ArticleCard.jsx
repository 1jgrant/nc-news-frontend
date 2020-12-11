import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArticleCardContainer = styled.div`
  display: flex;
  background: rgba(170, 213, 255, 0.093);
  padding: 0.5vh 1vw 0.5vh 1vw;
  margin: 0.5vh 0 0.5vh 0;
  width: 100%;
  max-height: 20vh;
  div {
  }
`;
const ArticleCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.3rem 0 0.3rem;
  .comments {
    color: rgba(16, 16, 93, 0.874);
    font-size: 0.8em;
    padding-right: 1em;
    align-self: flex-end;
  }
`;
const ArticleCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }
  .delete {
    align-self: flex-start;
  }
`;
const ArticleBody = styled.p`
  font-size: 0.8rem;
  grid-column-start: 2;
  background: rgba(111, 111, 111, 0.435);
  display: block;
  width: 1fr;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleCard = (props) => {
  const {
    title,
    author,
    body,
    votes,
    topic,
    comment_count,
    since_posted,
    article_id,
  } = props.article;
  return (
    <ArticleCardContainer>
      <Votes article_id={article_id} votes={votes} />
      <ArticleCardContent>
        <ArticleCardHeader>
          <Link className="link" to={`/articles/${article_id}`}>
            <h4>{title}</h4>
          </Link>
          {props.username === author ? (
            <button
              className="delete"
              onClick={() => props.handleDeleteArticle(article_id)}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          ) : null}
        </ArticleCardHeader>
        {/* <ArticleBody>{body}</ArticleBody> */}
        <span>
          posted in {topic} by{' '}
          <Link className="link author" to={`/users/${author}`}>
            <span>{author}</span>
          </Link>{' '}
          {since_posted}
        </span>
        <Link className="link comments" to={`/articles/${article_id}`}>
          {comment_count} comments
        </Link>
      </ArticleCardContent>
    </ArticleCardContainer>
  );
};

export default ArticleCard;
