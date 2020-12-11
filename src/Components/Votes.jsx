import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as API from '../API';

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  font-size: 1em;
  button {
    font-size: 1em;
    padding: 0;
    margin: 0;
    text-align: center;
    max-width: 10vw;
  }
`;

class Votes extends Component {
  state = {
    voteChange: 0,
    hasVoted: false,
  };

  handleVote = (event) => {
    const { article_id, comment_id } = this.props;
    const { hasVoted, voteChange } = this.state;
    const targetComponent = { article_id, comment_id };
    const buttonVal = Number(event.target.value);
    // compare the value of the button pressed to the current voteChange in state
    // if they are the same, remove that vote (reset) and set hasVoted to false
    // if they are not the same, check if there is already a vote that needs to be overwritten
    // if so, send the patch request 2* the button value
    const changeToMake =
      buttonVal === voteChange
        ? { voteChange: 0, patchChange: -buttonVal, hasVoted: false }
        : hasVoted === true
        ? { voteChange: buttonVal, patchChange: buttonVal * 2, hasVoted: true }
        : { voteChange: buttonVal, patchChange: buttonVal, hasVoted: true };

    API.updateVotes(targetComponent, changeToMake.patchChange).catch((err) => {
      this.setState({ voteChange: 0, hasVoted: false });
    });
    this.setState({
      voteChange: changeToMake.voteChange,
      hasVoted: changeToMake.hasVoted,
    });
  };

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    return (
      <VotesContainer>
        <button onClick={this.handleVote} value={1}>
          <FontAwesomeIcon className="vote" icon="angle-up" />
        </button>
        <span>{votes + Number(voteChange)}</span>
        <button onClick={this.handleVote} value={-1}>
          <FontAwesomeIcon className="vote" icon="angle-down" />
        </button>
      </VotesContainer>
    );
  }
}

export default Votes;
