import React, { Component } from 'react';
import ArticleControls from './ArticleControls';
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

class Articles extends Component {
  state = {
    currentTopic: '',
    articles: [],
    isLoading: true,
    hasError: false,
    error: {},
  };

  componentDidMount() {
    API.getArticles(this.props.topic_name, this.props['*'])
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
    if (
      this.props.topic_name !== prevProps.topic_name ||
      this.props['*'] !== prevProps['*']
    ) {
      API.getArticles(this.props.topic_name, this.props['*']).then(
        (articles) => {
          this.setState({ articles, isLoading: false });
        }
      );
    }
  }

  render() {
    //console.log(this.props);
    const isValidPath = ['', 'top', 'popular', 'new'].includes(this.props['*']);
    const { hasError, error, isLoading } = this.state;
    if (!isValidPath || hasError) {
      return <ErrorPage error={error} isValidPath={isValidPath} />;
    } else if (isLoading) {
      return (
        <ArticlesContainer>
          <Loader />
        </ArticlesContainer>
      );
    } else
      return (
        <ArticlesContainer>
          <div>
            <ArticleControls />
          </div>
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
