import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://jg-news-app.herokuapp.com/api",
});

export const getArticles = () => {
  return ncNewsAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
