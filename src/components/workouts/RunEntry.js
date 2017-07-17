import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateRunEntry } from '@/store/actions';

export default class RunEntry extends Component {

  constructor(props) {
    super(props);

    const notes = props.notes;
    const distance = props.distance;
    const duration = props.duration;
    const elevationDelta = props.elevationDelta;

    this.state = {
      updateView: false,
      notes,
      distance,
      duration,
      elevationDelta,
    };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleElevationDeltaChange = this.handleElevationDeltaChange.bind(this);
  }

  onUpdateRunEntryClick() {
    const { runEntryID, onUpdate, dispatch } = this.props;

    const notes = this.state.notes;
    const distance = this.state.distance;
    const duration = this.state.duration;
    const elevationDelta = this.state.elevationDelta;

    const runEntryData = {
      notes,
      distance,
      duration,
      elevation_delta: elevationDelta,
    };

    dispatch(updateRunEntry(runEntryID, runEntryData)).then(
      () => {
        onUpdate();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  onCancelUpdateClick() {
    this.setState({ updateView: false });
  }

  setUpdateView() {
    this.setState({ updateView: true });
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
    const { notes, distance, duration, elevationDelta } = this.props;

    return (
      <div>
        { !this.state.updateView &&
          <div>
            <h1>{distance} - {duration}
              - {elevationDelta} - {notes}</h1>
            <button onClick={() => this.setUpdateView()}>Update</button>
          </div>
        }
        { this.state.updateView &&
          <div>
            <input type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="notes" />
            <input type="number" value={this.state.distance} onChange={this.handleDistanceChange} placeholder="distance" />
            <input type="time" value={this.state.duration} onChange={this.handleDurationChange} placeholder="duration" />
            <input type="number" value={this.state.elevationDelta} onChange={this.handleElevationDeltaChange} placeholder="elevation delta" />
            <button onClick={() => this.onUpdateRunEntryClick()}>Save Changes</button>
            <button onClick={() => this.onCancelUpdateClick()}>Cancel</button>
          </div>
        }
      </div>
    );
  }
}

RunEntry.propTypes = {
  runEntryID: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  elevationDelta: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
