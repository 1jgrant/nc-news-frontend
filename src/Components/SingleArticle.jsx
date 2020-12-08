import React, { Component } from 'react';
import styled from 'styled-components';

class SingleArticle extends Component {
  state = {
    article: {
      article_id: 16,
      title: 'History of FC Barcelona',
      body:
        "The history of Futbol Club Barcelona goes from the football club's founding in 1899 and up to current time. FC Barcelona, also known simply as Barcelona and familiarly as Barça, is based in Barcelona, Catalonia, Spain. The team was founded in 1899 by a group of Swiss, English and Spanish footballers led by Joan Gamper. The club played amateur football until 1910 in various regional competitions. In 1910, the club participated in their first of many European competitions, and has since amassed ten UEFA trophies and a sextuple. In 1928, Barcelona co-founded La Liga, the top-tier in Spanish football, along with a string of other clubs. As of 2016, Barcelona has never been relegated from La Liga, a record they share with Athletic Bilbao and arch-rival Real Madrid. The history of Barcelona has often been politically. Though it is a club created and run by foreigners, Barcelona gradually became a club associated with Catalan values. In Spain's transition to autocracy in 1925, Catalonia became increasingly hostile towards the central government in Madrid. The hostility enhanced Barcelona's image as a focal point for Catalonism, and when Francisco Franco banned the use of the Catalan language, the stadium of Barcelona became one of the few places the people could express their dissatisfaction. The Spanish transition to democracy in 1978 has not dampened the club's image of Catalan pride. In the 2000s – a period of sporting success in the club and an increased focus on Catalan players – club officials have openly called for Catalonia to become an independent state.",
      votes: 0,
      topic: 'football',
      author: 'weegembump',
      created_at: '2018-02-17T20:38:43.448Z',
      comment_count: 16,
    },
    isLoading: true,
  };

  render() {
    const { title, body } = this.state.article;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default SingleArticle;
