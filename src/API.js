import axios from 'axios';
import { formatCreatedAt } from './Components/utils/data-formatting';

const ncNewsAPI = axios.create({
  baseURL: 'https://jg-news-app.herokuapp.com/api',
});

export const getArticles = (topic_slug) => {
  return ncNewsAPI
    .get('/articles', {
      params: {
        topic: topic_slug,
      },
    })
    .then(({ data }) => {
      return formatCreatedAt(data.articles);
    });
};

export const getTopics = () => {
  return ncNewsAPI.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return formatCreatedAt([data.article])[0];
  });
};

export const getComments = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return formatCreatedAt(data.comments);
  });
};
