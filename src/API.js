import axios from 'axios';
import { formatCreatedAt } from './Components/utils/data-formatting';

const ncNewsAPI = axios.create({
  baseURL: 'https://jg-news-app.herokuapp.com/api',
});

export const getArticles = (topic_slug, query) => {
  const queries = {
    top: { sort_by: 'votes' },
    popular: { sort_by: 'comment_count' },
    new: { sort_by: 'created_at' },
  };
  return ncNewsAPI
    .get('/articles', {
      params: {
        topic: topic_slug,
        ...queries[query],
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

export const getUsers = () => {
  return ncNewsAPI.get('/users').then(({ data }) => {
    return data.users;
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

export const updateVotes = (target, change) => {
  const { article_id, comment_id } = target;
  if (article_id) {
    return ncNewsAPI.patch(`/articles/${article_id}`, { inc_votes: change });
  }
  if (comment_id) {
    return ncNewsAPI.patch(`/comments/${comment_id}`, { inc_votes: change });
  }
};

export const postComment = (comment, article_id) => {
  return ncNewsAPI
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      console.log('data', data);
      return formatCreatedAt([data.newComment])[0];
    });
};
