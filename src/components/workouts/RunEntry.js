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
    const runEntryData = this.getCurrentRunEntryData();

    this.dispatchUpdateRunEntry(runEntryData);
  }

  onDeleteRunEntryClick() {
    const currentRunEntryData = this.getCurrentRunEntryData();
    const runEntryData = {
      ...currentRunEntryData,
      is_active: false,
    };

    this.dispatchUpdateRunEntry(runEntryData);
  }

  onCancelUpdateClick() {
    this.setState({ updateView: false });
  }

  setUpdateView() {
    this.setState({ updateView: true });
  }

  getCurrentRunEntryData() {
    const notes = this.state.notes;
    const distance = this.state.distance;
    const duration = this.state.duration;
    const elevationDelta = this.state.elevationDelta;

    return {
      notes,
      distance,
      duration,
      elevation_delta: elevationDelta,
      is_active: true,
    };
  }

  dispatchUpdateRunEntry(runEntryData) {
    const { runEntryID, onUpdate, dispatch } = this.props;

    dispatch(updateRunEntry(runEntryID, runEntryData)).then(
      () => {
        onUpdate();
      },
      (error) => {
        console.log(error); // eslint-disable-line
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
    const { notes, distance, duration, elevationDelta } = this.props;

    return (
      <div className="card">
        { !this.state.updateView &&
          <div className="card-content">
            <h1>Run Info</h1>
            <table className="table is-bordered is-striped">
              <tbody>
                <tr>
                  <td>Distance</td>
                  <td>{distance} miles</td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td>{duration}</td>
                </tr>
                <tr>
                  <td>Elevation Delta</td>
                  <td>{elevationDelta} ft</td>
                </tr>
              </tbody>
            </table>
            { (notes && notes !== '') &&
              <div>
                <h2>Notes</h2>
                <p>{notes}</p>
              </div>
            }
            <hr />
            <button className="button is-info" onClick={() => this.setUpdateView()}>Update</button>
            <button className="button is-danger" onClick={() => this.onDeleteRunEntryClick()}>Delete</button>
          </div>
        }
        { this.state.updateView &&
          <div className="card-content">
            <div className="field">
              <label htmlFor="editDistance" className="label">Distance</label>
              <div className="control">
                <input
                  id="editDistance"
                  className="input"
                  type="number"
                  value={this.state.distance}
                  onChange={this.handleDistanceChange}
                  placeholder="distance"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="editDuration" className="label">Duration</label>
              <div className="control">
                <input
                  id="editDuration"
                  className="input"
                  type="time"
                  value={this.state.duration}
                  onChange={this.handleDurationChange}
                  placeholder="duration"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="editElevationDelta" className="label">Elevation Delta</label>
              <div className="control">
                <input
                  id="editElevationDelta"
                  className="input"
                  type="number"
                  value={this.state.elevationDelta}
                  onChange={this.handleElevationDeltaChange}
                  placeholder="elevation delta"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="editNotes" className="label">Notes</label>
              <div className="control">
                <input
                  id="editNotes"
                  className="input"
                  type="text"
                  value={this.state.notes}
                  onChange={this.handleNotesChange}
                  placeholder="notes"
                />
              </div>
            </div>
            <button className="button is-success" onClick={() => this.onUpdateRunEntryClick()}>Save Changes</button>
            <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
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
