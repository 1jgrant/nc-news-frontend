import axios from 'axios';
import { formatCreatedAt } from './Components/utils/data-formatting';

const ncNewsAPI = axios.create({
  baseURL: 'https://jg-news-app.herokuapp.com/api',
});

export const getArticles = (topic_slug, filter, limit, p, author) => {
  const filters = {
    top: { sort_by: 'votes' },
    popular: { sort_by: 'comment_count' },
    new: { sort_by: 'created_at' },
  };
  return ncNewsAPI
    .get('/articles', {
      params: {
        topic: topic_slug,
        limit,
        p,
        author,
        ...filters[filter],
      },
    })
    .then(({ data }) => {
      return formatCreatedAt(data.articles);
    });
};

export const getArticleNum = (topic_slug, filter, limit, p, author) => {
  const filters = {
    top: { sort_by: 'votes' },
    popular: { sort_by: 'comment_count' },
    new: { sort_by: 'created_at' },
  };
  return ncNewsAPI
    .get('/articles', {
      params: {
        topic: topic_slug,
        limit,
        p,
        author,
        ...filters[filter],
      },
    })
    .then(({ data }) => {
      return data.articles.length;
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

export const getUser = (username) => {
  return ncNewsAPI.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const getArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return formatCreatedAt([data.article])[0];
  });
};

export const getComments = (article_id, sort_by, order, limit = 1000) => {
  return ncNewsAPI
    .get(`/articles/${article_id}/comments`, {
      params: {
        sort_by,
        order,
        limit,
      },
    })
    .then(({ data }) => {
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
      return formatCreatedAt([data.newComment])[0];
    });
};

export const deleteComment = (comment_id) => {
  return ncNewsAPI.delete(`/comments/${comment_id}`);
};

export const deleteArticle = (article_id) => {
  return ncNewsAPI.delete(`/articles/${article_id}`);
};

export const postArticle = (submittedArticle) => {
  return ncNewsAPI.post(`/articles`, submittedArticle).then(({ data }) => {
    return formatCreatedAt([data.newArticle])[0];
  });
};
