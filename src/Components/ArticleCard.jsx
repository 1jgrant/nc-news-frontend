import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Votes from './Votes';
import '../App.css';

const ArticleCardContainer = styled.div`
  display: flex;
  background: rgba(152, 154, 152, 0.168);
  padding: 0.5vh 1vw 0.5vh 1vw;
  margin: 0.5vh 0 0.5vh 0;
  width: 100%;
  max-height: 20vh;
  div {
    background: rgba(176, 178, 176, 0.764);
  }
`;
const ArticleCardContent = styled.div`
  display: flex;
  flex-direction: column;
  .comments {
    color: rgba(16, 16, 93, 0.874);
    text-decoration: none;
    align-self: flex-end;
  }
`;
const ArticleCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  h4 {
    margin: 0.3rem;
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
          <span>
            posted in {topic} by{' '}
            <Link className="link author" to={`/users/${author}`}>
              <span>{author}</span>
            </Link>{' '}
            {since_posted}
          </span>
          {props.username === author ? (
            <button onClick={() => props.handleDeleteArticle(article_id)}>
              delete
            </button>
          ) : null}
        </ArticleCardHeader>
        {/* <ArticleBody>{body}</ArticleBody> */}
        <Link className="link comments" to={`/articles/${article_id}`}>
          {comment_count} comments
        </Link>
      </ArticleCardContent>
    </ArticleCardContainer>
  );
};

export default ArticleCard;
