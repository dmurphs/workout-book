// CreateRunEntry.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createRunEntry } from '@/store/actions';

export default class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      notes: '',
      distance: '',
      duration: '',
      elevationDelta: '',
    };

    this.state = this.defaultState;

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleElevationDeltaChange = this.handleElevationDeltaChange.bind(this);
  }

  handleRunEntryCreateClick() {
    const { dispatch, workoutID, onRunCreated } = this.props;

    const runEntryData = {
      notes: this.state.notes,
      distance: this.state.distance,
      duration: this.state.duration,
      elevation_delta: this.state.elevationDelta,
    };

    dispatch(createRunEntry(workoutID, runEntryData)).then(
      () => {
        onRunCreated();
        this.setState(this.defaultState);
      });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  handleDurationChange(event) {
    this.setState({ duration: event.target.value });
  }

  handleElevationDeltaChange(event) {
    this.setState({ elevationDelta: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="notes" />
        <input type="number" value={this.state.distance} onChange={this.handleDistanceChange} placeholder="distance" />
        <input type="time" value={this.state.duration} onChange={this.handleDurationChange} placeholder="duration" />
        <input type="number" value={this.state.elevationDelta} onChange={this.handleElevationDeltaChange} placeholder="elevation delta" />
        <button onClick={() => this.handleRunEntryCreateClick()}>Create Run Entry</button>
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  onRunCreated: PropTypes.func.isRequired,
};
