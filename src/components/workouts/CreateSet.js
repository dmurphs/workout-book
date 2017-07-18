// CreateRunEntry.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createSet } from '@/store/actions';

export default class CreateSet extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      numReps: '',
      weight: '',
    };

    this.state = this.defaultState;

    this.handleNumRepsChange = this.handleNumRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
  }

  handleSetCreationClick() {
    const { dispatch, liftEntryID, onSetCreated } = this.props;

    const setData = {
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

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="field">
          <input className="input" type="number" value={this.state.numReps} onChange={this.handleNumRepsChange} placeholder="number of reps" />
        </div>
        <div className="field">
          <input className="input" type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder="weight" />
        </div>
        <div className="field">
          <button className="button is-success" onClick={() => this.handleSetCreationClick()}>Create Set</button>
        </div>
      </div>
    );
  }
}

CreateSet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  onSetCreated: PropTypes.func.isRequired,
};
