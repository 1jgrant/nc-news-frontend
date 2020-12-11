import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import Votes from './Votes';
import Comments from './Comments';
import * as API from '../API';
import Loader from './Loader';
import ErrorPage from './ErrorPage';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const ArticleContainer = styled.div`
  display: flex;

  padding: 10px;
  width: 100%100vw;
  margin: 20px;
`;

const ArticleHeader = styled.div`
  h1 {
    margin-bottom: 0rem;
  }
`;

const ArticleContent = styled.div`
  padding-left: 1rem;
  padding-right: 3rem;
`;

const ArticleBody = styled.p``;

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
            <Votes article_id={article_id} votes={votes} />
            <ArticleContent>
              <ArticleHeader>
                <h1>{title}</h1>
                <span>
                  posted in {topic} by{' '}
                  <Link className="author" to={`/users/${author}`}>
                    <span>{author}</span>
                  </Link>{' '}
                  {since_posted}
                </span>
              </ArticleHeader>
              <ArticleBody>{body}</ArticleBody>
            </ArticleContent>
            {username === author ? (
              <button
                onClick={() => this.handleDeleteSingleArticle(article_id)}
              >
                delete
              </button>
            ) : null}
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
