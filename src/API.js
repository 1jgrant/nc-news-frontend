import axios from 'axios';

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
      return data.articles;
    });
};

export const getTopics = () => {
  return ncNewsAPI.get('/topics').then(({ data }) => {
    return data.topics;
  });
};
