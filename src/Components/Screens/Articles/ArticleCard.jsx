import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Votes from '../../Votes';
import '../../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArticleCardContainer = styled.div`
  display: flex;
  background: rgba(237, 246, 249, 0.298);
  padding: 0.5vh 1vw 0.5vh 2vw;
  margin: 0.5vh 0 0.5vh 0;
  max-height: 20vh;
`;
const ArticleCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.3rem 0 0.5rem;
  width: 100%;
  .comments {
    font-size: 0.7em;
    padding-top: 0.5em;
    padding-right: 1em;
    align-self: flex-end;
  }
  .articleDetails {
    font-size: 0.8em;
  }
`;
const ArticleCardHeader = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
  grid-template-rows: auto;
  margin: 0;
  padding: 0;
  h4 {
    font-size: 1.05em;
    margin: 0.3rem 0 0.3rem 0;
  }
  .delBox {
    justify-self: end;
    width: 40px;
    .trashIcon {
      pointer-events: none;
    }
  }
`;

const ArticleCard = (props) => {
  const {
    title,
    author,
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
          <div className="delBox">
            {props.username === author ? (
              <button
                className="delete"
                onClick={() => props.handleDeleteArticle(article_id)}
              >
                <FontAwesomeIcon className="trashIcon" icon="trash" />
              </button>
            ) : null}
          </div>
        </ArticleCardHeader>
        <span className="articleDetails">
          posted in {topic} by{' '}
          <Link className="link author" to={`/users/${author}`}>
            <b>{author}</b>
          </Link>{' '}
          {since_posted}
        </span>

        <Link className="link comments" to={`/articles/${article_id}`}>
          <b>{comment_count} comments</b>
        </Link>
      </ArticleCardContent>
    </ArticleCardContainer>
  );
};

export default ArticleCard;
