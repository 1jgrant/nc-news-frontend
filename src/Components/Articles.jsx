import React, { Component } from 'react';
import { Link } from '@reach/router';
import OptionControls from './OptionControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import * as API from '../API';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const ControlsContainer = styled.div`
  background: rgba(239, 153, 153, 0.531);
  margin: 0.5rem;
  padding: 1rem;

  .link {
    padding: 5px;
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
    API.getArticles(this.props.topic_name, this.props['*'], limit, p)
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
    if (
      this.props.topic_name !== prevProps.topic_name ||
      this.props['*'] !== prevProps['*'] ||
      limit !== prevState.limit ||
      p !== prevState.p
    ) {
      API.getArticles(this.props.topic_name, this.props['*'], limit, p).then(
        (articles) => {
          this.setState({ articles, isLoading: false });
        }
      );
    }
  }

  handlePageOptions = (options) => {
    this.setState(options);
  };

  render() {
    const isInvalidPath = !['', 'top', 'popular', 'new'].includes(
      this.props['*']
    );
    const { hasError, error, isLoading } = this.state;
    const { topic_name } = this.props;
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
          <Link to={`/submit`} state={{ linkedFrom: topic_name }}>
            POST
          </Link>
          <ControlsContainer>
            <Link to="top">Top</Link>
            <Link to="popular">Popular</Link>
            <Link to="new">New</Link>
          </ControlsContainer>
          <OptionControls
            handlePageOptions={this.handlePageOptions}
            currentPage={this.state.p}
            currentLimit={this.state.Limit}
          />
          <main>
            {this.state.articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </main>
        </ArticlesContainer>
      );
  }
}

export default Articles;
