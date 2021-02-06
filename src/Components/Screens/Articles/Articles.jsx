import React, { Component } from 'react';
import { Link } from '@reach/router';
import OptionControls from '../../OptionControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from '../../Loader';
import ErrorPage from '../Errors/ErrorPage';
import * as API from '../../../API';
import '../../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-bootstrap/Pagination';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  width: 100vw;
  margin: 0;
  main {
    display: flex;
    flex-direction: column;
  }
  .pagination {
    margin: 0.5em 0 0.5em 0;
    align-self: center;
  }
  .page-item {
    .page-link {
      color: rgb(0, 109, 119);
    }
  }
  .active {
    .page-link {
      color: white;
      background-color: rgb(0, 109, 119);
      border: 1px solid rgb(0, 109, 119);
    }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(237, 246, 249);
  margin: 0.5rem 0rem 0.5rem 0rem;
  padding: 0.5rem 0rem 0.5rem 0rem;
  font-size: 0.8em;
  width: 100vw;
  color: rgb(0, 109, 119);
  .wrapper {
    display: flex;
    flex-direction: row !important;
    align-self: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media only screen and (min-width: 768px) {
      width: 800px;
    }
    .sortLinks {
      justify-self: flex-start;
      padding-left: 0.7rem;
      align-items: center;
      font-size: 1em;
    }
  }
  .link {
    color: rgb(0, 109, 119);
    padding: 0.4em;
  }
  .sortSelect {
    font-size: 1.4em;
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
    totalArticles: 0,
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
    //get total number of articles in the db with the selected filters
    API.getArticleNum(
      this.props.topic_name,
      this.props['*'],
      1000,
      p,
      selectedAuthor
    )
      .then((quantity) => {
        this.setState({ totalArticles: quantity });
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
      API.getArticleNum(
        this.props.topic_name,
        this.props['*'],
        1000,
        1,
        selectedAuthor
      ).then((quantity) => {
        this.setState({ totalArticles: quantity });
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

  handlePageBar = (targetPage, maxPage) => {
    const newPage =
      targetPage < 1 ? 1 : targetPage > maxPage ? maxPage : targetPage;
    this.setState({ p: newPage });
  };

  render() {
    const isInvalidPath = !['', 'top', 'popular', 'new'].includes(
      this.props['*']
    );
    const { hasError, error, isLoading, p, limit, totalArticles } = this.state;
    //create pagination bar items
    const maxPage = Math.ceil(totalArticles / limit);
    const pages = [];
    for (let i = 1; i <= maxPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === p}
          onClick={() => this.handlePageBar(i, maxPage)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (isInvalidPath || hasError) {
      return <ErrorPage error={error} isInvalidPath={isInvalidPath} />;
    }
    return (
      <ArticlesContainer>
        <ControlsContainer>
          <div className="wrapper">
            <div className="sortLinks">
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
              currentPage={p}
              currentLimit={limit}
              totalArticles={totalArticles}
            />
          </div>
        </ControlsContainer>
        {isLoading ? (
          <Loader />
        ) : (
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
            <Pagination>
              <Pagination.Prev
                onClick={() => this.handlePageBar(p - 1, maxPage)}
              />
              {pages}
              <Pagination.Next
                onClick={() => this.handlePageBar(p + 1, maxPage)}
              />
            </Pagination>
          </main>
        )}
      </ArticlesContainer>
    );
  }
}

export default Articles;
