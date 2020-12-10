import React, { Component } from 'react';
import { Link } from '@reach/router';
import ArticleControls from './ArticleControls';
import ArticleCard from './ArticleCard';
import styled from 'styled-components';
import Loader from './Loader';
import * as API from '../API';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Articles extends Component {
  state = {
    currentTopic: '',
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    API.getArticles(this.props.topic_name, this.props['*']).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.topic_name !== prevProps.topic_name ||
      this.props['*'] !== prevProps['*']
    ) {
      console.log('in logic');
      API.getArticles(this.props.topic_name, this.props['*']).then(
        (articles) => {
          this.setState({ articles, isLoading: false });
        }
      );
    }
  }

  render() {
    if (this.state.isLoading)
      return (
        <ArticlesContainer>
          <Loader />
        </ArticlesContainer>
      );
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
