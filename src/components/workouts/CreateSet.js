// CreateRunEntry.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createSet } from '@/store/actions';

export default class CreateSet extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      setNum: '',
      numReps: '',
      weight: '',
    };

    this.state = this.defaultState;

    this.handleSetNumChange = this.handleSetNumChange.bind(this);
    this.handleNumRepsChange = this.handleNumRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
  }

  handleSetCreationClick() {
    const { dispatch, liftEntryID, onSetCreated } = this.props;

    const setData = {
      set_num: this.state.setNum,
      num_reps: this.state.numReps,
      weight: this.state.weight,
      is_active: true,
    };

    dispatch(createSet(liftEntryID, setData)).then(
      () => {
        onSetCreated();
        // this.setState(this.defaultState);
      });
  }

  handleSetNumChange(event) {
    this.setState({ setNum: event.target.value });
  }

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="number" value={this.state.setNum} onChange={this.handleSetNumChange} placeholder="set number" />
        <input type="number" value={this.state.numReps} onChange={this.handleNumRepsChange} placeholder="number of reps" />
        <input type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder="weight" />
        <button onClick={() => this.handleSetCreationClick()}>Create Set</button>
      </div>
    );
  }
}

CreateSet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  onSetCreated: PropTypes.func.isRequired,
};
