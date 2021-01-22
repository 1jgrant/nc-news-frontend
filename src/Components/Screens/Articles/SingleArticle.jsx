import React, { Component } from 'react';
import styled from 'styled-components';
import '../../../App.css';
import { Link } from '@reach/router';
import Votes from '../../Votes';
import Comments from '../Comments/Comments';
import * as API from '../../../API';
import Loader from '../../Loader';
import ErrorPage from '../Errors/ErrorPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const ArticleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  padding: 0.5vh 0vw 0.5vh 0vw;
  margin: 3vh 0 0.5vh 0;
  .votes {
    margin: 0 0 0 2vw;
  }
`;

const ArticleContent = styled.div`
  width: 100%;
  padding: 0 2vw 0 2vw;
  .articleDetails {
    font-size: 0.8em;
  }
`;

const ArticleHeader = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
  grid-template-rows: auto;
  width: 100%;
  margin: 0;
  padding: 0 0 0.5vh 0;
  h1 {
    font-size: 1.4em;
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
  .delBox {
    justify-self: end;
    width: 40px;
    .trashIcon {
      pointer-events: none;
    }
  }
`;

const ArticleBody = styled.p`
  padding: 0 5vw 0 0;
`;

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    error: {},
  };

  componentDidMount() {
    API.getArticle(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        const {
          response: {
            status,
            data: { msg },
          },
        } = err;
        this.setState({
          error: { status, msg },
          hasError: true,
          isLoading: false,
        });
      });
  }

  handleDeleteSingleArticle = (article_id) => {
    API.deleteArticle(article_id).then(() => {
      this.setState((currentState) => {
        const filteredArticles = currentState.articles.filter((article) => {
          return article.article_id !== article_id;
        });
        return { articles: filteredArticles };
      });
    });
  };

  render() {
    const {
      title,
      body,
      votes,
      topic,
      author,
      since_posted,
      article_id,
    } = this.state.article;
    const { isLoading, hasError, error } = this.state;
    const { username } = this.props;
    if (hasError) {
      return <ErrorPage error={error} />;
    } else if (isLoading) {
      return (
        <ContentContainer>
          <Loader />
        </ContentContainer>
      );
    } else
      return (
        <ContentContainer>
          <ArticleContainer>
            <section className="votes">
              <Votes article_id={article_id} votes={votes} />
            </section>
            <ArticleContent>
              <ArticleHeader>
                <h1>{title}</h1>
                <div className="delBox">
                  {username === author ? (
                    <button
                      className="delete"
                      onClick={() => this.handleDeleteSingleArticle(article_id)}
                    >
                      <FontAwesomeIcon className="trashIcon" icon="trash" />
                    </button>
                  ) : null}
                </div>
              </ArticleHeader>
              <span className="articleDetails">
                posted in {topic} by{' '}
                <Link className="link author" to={`/users/${author}`}>
                  <b>
                    <span>{author}</span>
                  </b>
                </Link>{' '}
                {since_posted}
              </span>
              <ArticleBody>{body}</ArticleBody>
            </ArticleContent>
          </ArticleContainer>
          <Comments
            article_id={this.props.article_id}
            username={this.props.username}
          />
        </ContentContainer>
      );
  }
}

export default SingleArticle;
