import React, { Component } from 'react';
import styled from 'styled-components';
import '../../../App.css';
import { Link, navigate } from '@reach/router';
import Votes from '../../Votes';
import Comments from '../Comments/Comments';
import * as API from '../../../API';
import Loader from '../../Loader';
import ErrorPage from '../Errors/ErrorPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  .wrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    @media only screen and (min-width: 768px) {
      width: 800px;
    }
  }
  .delCont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    max-height: 300px;
    .deleted {
      color: rgb(0, 109, 119);
    }
    button {
      background: rgb(0, 109, 119);
      border: 2px solid rgb(0, 109, 119);
      margin: 1em 0 0 0;
      :focus {
        background: rgb(0, 109, 119);
      }
    }
  }
`;

const ArticleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0em 0vw 0.5vh 0vw;
  margin: 1em 0 0.5vh 0;
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
  button {
    font-size: 0.7rem;
    color: rgb(0, 109, 119);
    border: 1px solid rgb(0, 109, 119);
  }
`;

const ArticleBody = styled.p`
  padding: 1em 2rem 0 0;
`;

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    error: {},
    isDeleted: false,
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
      this.setState({ isDeleted: true });
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
    const { isLoading, hasError, error, isDeleted } = this.state;
    const { username } = this.props;
    if (hasError) {
      return <ErrorPage error={error} />;
    } else if (isLoading) {
      return (
        <ContentContainer>
          <Loader />
        </ContentContainer>
      );
    } else if (isDeleted) {
      return (
        <ContentContainer>
          <div className="delCont">
            <h1 className="deleted">Article Deleted</h1>
            <Button
              variant="info"
              onClick={() => navigate(`/users/${username}`)}
              block
            >
              Your Profile
            </Button>
            <Button variant="info" onClick={() => navigate(`/`)} block>
              Home
            </Button>
          </div>
        </ContentContainer>
      );
    } else
      return (
        <ContentContainer>
          <div className="wrapper">
            <ArticleContainer>
              <section className="votes">
                <Votes article_id={article_id} votes={votes} />
              </section>
              <ArticleContent>
                <ArticleHeader>
                  <h1>{title}</h1>
                  <div className="delBox">
                    {username === author ? (
                      <Button
                        size="sm"
                        variant="outline-info"
                        onClick={() =>
                          this.handleDeleteSingleArticle(article_id)
                        }
                      >
                        <FontAwesomeIcon className="trashIcon" icon="trash" />
                      </Button>
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
          </div>
        </ContentContainer>
      );
  }
}

export default SingleArticle;
