import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import * as API from '../API';

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  min-width: 1.5em;
  font-size: 1em;
  padding: 0;
  button {
    font-size: 0.9em;
    padding: 0;
    margin: 0;
    text-align: center;
    width: 4vw;
    max-width: 15px;
  }
  .btn-info {
      background-color: rgb(0, 109, 119);
      border: 1px solid rgb(0, 109, 119);
    }
  .btn-outline-info {
      color: rgb(0, 109, 119);
      border: 1px solid rgb(0, 109, 119);
    }
  .voteIcon {
    pointer-events: none;
  }
`;

class Votes extends Component {
  state = {
    voteChange: 0,
    hasVoted: false,
    appearance: {
      on: 'info',
      off: 'outline-info'
    },
    up: 'off',
    down: 'off'
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
      buttonVal === Number(voteChange)
        ? { voteChange: 0, patchChange: -buttonVal, hasVoted: false }
        : hasVoted === true
        ? { voteChange: buttonVal, patchChange: buttonVal * 2, hasVoted: true }
        : { voteChange: buttonVal, patchChange: buttonVal, hasVoted: true };
    API.updateVotes(targetComponent, changeToMake.patchChange).catch((err) => {
      this.setState({ voteChange: 0, hasVoted: false }, () => {});
    });
    this.setState((currentState) => {
      // change the appearance of the buttons to show the current selection
      const targetButton = event.target.name === 'up' ? 'up' : 'down';
      const nonTargetButton = event.target.name === 'up' ? 'down' : 'up';
      const newValue = currentState[targetButton] === 'off' ? 'on' : 'off';
      return {
        ...currentState,
        voteChange: changeToMake.voteChange,
        hasVoted: changeToMake.hasVoted,
        [targetButton]: newValue,
        [nonTargetButton]: 'off'
      }
    });
  };

  render() {
    const { votes } = this.props;
    const { voteChange, up, down, appearance } = this.state;
    return (
      <VotesContainer>
        <Button variant={appearance[up]} key='up' className={up} onClick={this.handleVote} value={1} name='up'>
          <FontAwesomeIcon className="voteIcon" icon="angle-up" />
        </Button>
        <span className="score">{votes + Number(voteChange)}</span>
        <Button variant={appearance[down]} key='down' className={down} onClick={this.handleVote} value={-1} name='down'>
          <FontAwesomeIcon className="voteIcon" icon="angle-down" />
        </Button>
      </VotesContainer>
    );
  }
}

export default Votes;
