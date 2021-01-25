import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import Votes from '../../Votes';
import '../../../App.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArticleCardContainer = styled.div`
  display: flex;
  background: rgba(237, 246, 249, 0.298);
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  margin: 0.1rem 0 0.1rem 0;
  max-height: 20vh;

  @media only screen and (min-width: 768px) {
    width: 800px;
  }
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
    width: 35px;
    .trashIcon {
      pointer-events: none;
    }
  }
  button {
    font-size: 0.7rem;
    color: rgb(0, 109, 119);
    border: 1px solid rgb(0, 109, 119);
    font-size: 0.6rem;
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
              <Button
                size="sm"
                variant="outline-info"
                className="delete"
                onClick={() => props.handleDeleteArticle(article_id)}
              >
                <FontAwesomeIcon className="trashIcon" icon="trash" />
              </Button>
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
