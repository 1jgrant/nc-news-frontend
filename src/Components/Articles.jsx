import React, { Component } from 'react';
import { Link } from '@reach/router';
import OptionControls from './OptionControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import * as API from '../API';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(237, 246, 249);
  margin: 0.5vh 0 0.5vh 0;
  padding: 1vh;
  font-size: 0.8em;
  width: 100%;
  color: rgb(0, 109, 119);
  .link {
    color: rgb(0, 109, 119);
    padding: 0.4em;
  }
`;

class Articles extends Component {
  state = {
    currentTopic: '',
    articles: [],
    isLoading: true,
    hasError: false,
    error: {},
    limit: 10,
    p: 1,
  };

  componentDidMount() {
    const { limit, p } = this.state;
    const { selectedAuthor } = this.props;
    API.getArticles(
      this.props.topic_name,
      this.props['*'],
      limit,
      p,
      selectedAuthor
    )
      .then((articles) => {
        this.setState({ articles, isLoading: false });
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

  componentDidUpdate(prevProps, prevState) {
    const { limit, p } = this.state;
    const { selectedAuthor } = this.props;
    if (
      this.props.topic_name !== prevProps.topic_name ||
      this.props['*'] !== prevProps['*'] ||
      limit !== prevState.limit ||
      p !== prevState.p
    ) {
      // only render the loading page if the topic or custom query has changed
      const shouldLoad = limit === prevState.limit && p === prevState.p;
      this.setState({ isLoading: shouldLoad }, () => {
        API.getArticles(
          this.props.topic_name,
          this.props['*'],
          limit,
          p,
          selectedAuthor
        ).then((articles) => {
          this.setState({ articles, isLoading: false });
        });
      });
    }
  }

  handlePageOptions = (options) => {
    this.setState(options);
  };

  handleDeleteArticle = (article_id) => {
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
    const isInvalidPath = !['', 'top', 'popular', 'new'].includes(
      this.props['*']
    );
    const { hasError, error, isLoading } = this.state;
    if (isInvalidPath || hasError) {
      return <ErrorPage error={error} isInvalidPath={isInvalidPath} />;
    } else if (isLoading) {
      return (
        <ArticlesContainer>
          <Loader />
        </ArticlesContainer>
      );
    } else
      return (
        <ArticlesContainer>
          <ControlsContainer>
            <div>
              <Link className="link" to="top">
                <FontAwesomeIcon className="sortSelect" icon="trophy" /> Top
              </Link>
              <Link className="link" to="popular">
                <FontAwesomeIcon className="sortSelect" icon="fire" /> Popular
              </Link>
              <Link className="link" to="new">
                <FontAwesomeIcon className="sortSelect" icon="clock" /> New
              </Link>
            </div>
            <OptionControls
              handlePageOptions={this.handlePageOptions}
              currentPage={this.state.p}
              currentLimit={this.state.Limit}
            />
          </ControlsContainer>
          <main>
            {this.state.articles.map((article) => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  handleDeleteArticle={this.handleDeleteArticle}
                  username={this.props.username}
                />
              );
            })}
          </main>
        </ArticlesContainer>
      );
  }
}

export default Articles;
