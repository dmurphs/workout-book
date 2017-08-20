import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { updateRunEntry, updateRunEntryReset, getRunEntries } from '@/store/actions';

class RunEntry extends Component {

  constructor(props) {
    super(props);

    const notes = props.notes;
    const distance = props.distance;
    const duration = props.duration;
    const elevationDelta = props.elevationDelta;

    this.defaultState = {
      updateView: false,
      notes,
      distance,
      duration,
      elevationDelta,
    };

    this.state = this.defaultState;

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
    const { dispatch } = this.props;

    dispatch(updateRunEntryReset());

    this.setState(this.defaultState);
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

  dispatchGetRunEntriesIfUpdated() {
    const { workoutID, dispatch, isUpdated } = this.props;

    if (isUpdated) {
      dispatch(getRunEntries(workoutID));
    }
  }

  dispatchUpdateRunEntry(runEntryData) {
    const { runEntryID, dispatch } = this.props;

    dispatch(updateRunEntry(runEntryID, runEntryData)).then(
      () => {
        this.dispatchGetRunEntriesIfUpdated();
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
    const {
      notes,
      distance,
      duration,
      elevationDelta,
      notesErrors,
      distanceErrors,
      durationErrors,
      elevationDeltaErrors,
      nonFieldErrors,
    } = this.props;

    return (
      <div className="card">
        { !this.state.updateView &&
          <div className="card-content">
            <div className="columns">
              <div className="column is-3 is-offset-9">
                <button className="button is-info" onClick={() => this.setUpdateView()}>
                  <span className="icon">
                    <i className="fa fa-edit" />
                  </span>
                </button>
                <button className="button is-danger" onClick={() => this.onDeleteRunEntryClick()}>
                  <span className="icon">
                    <i className="fa fa-close" />
                  </span>
                </button>
              </div>
            </div>
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
          </div>
        }
        { this.state.updateView &&
          <div className="card-content">
            <div className="field">
              <label htmlFor="editDistance" className="label">Distance (miles)</label>
              <div className="control">
                <input
                  id="editDistance"
                  className={distanceErrors ? 'input is-danger' : 'input'}
                  type="number"
                  value={this.state.distance}
                  onChange={this.handleDistanceChange}
                  placeholder="distance (miles)"
                />
                {distanceErrors &&
                  <Errors errors={distanceErrors} />
                }
              </div>
            </div>
            <div className="field">
              <label htmlFor="editDuration" className="label">Duration (hh:mm:ss)</label>
              <div className="control">
                <input
                  id="editDuration"
                  className={durationErrors ? 'input is-danger' : 'input'}
                  type="text"
                  value={this.state.duration}
                  onChange={this.handleDurationChange}
                  placeholder="duration (hh:mm:ss)"
                />
                {durationErrors &&
                  <Errors errors={durationErrors} />
                }
              </div>
            </div>
            <div className="field">
              <label htmlFor="editElevationDelta" className="label">Elevation Delta (ft)</label>
              <div className="control">
                <input
                  id="editElevationDelta"
                  className={elevationDeltaErrors ? 'input is-danger' : 'input'}
                  type="number"
                  value={this.state.elevationDelta}
                  onChange={this.handleElevationDeltaChange}
                  placeholder="elevation delta (ft)"
                />
                {elevationDeltaErrors &&
                  <Errors errors={elevationDeltaErrors} />
                }
              </div>
            </div>
            <div className="field">
              <label htmlFor="editNotes" className="label">Notes</label>
              <div className="control">
                <input
                  id="editNotes"
                  className={notesErrors ? 'input is-danger' : 'input'}
                  type="text"
                  value={this.state.notes}
                  onChange={this.handleNotesChange}
                  placeholder="notes"
                />
                {notesErrors &&
                  <Errors errors={notesErrors} />
                }
              </div>
            </div>
            {nonFieldErrors &&
              <Errors errors={nonFieldErrors} />
            }
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
  workoutID: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  elevationDelta: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  distanceErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  elevationDeltaErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryUpdate } = state;

  const { isUpdated, errors } = runEntryUpdate;

  const notesErrors = errors ? errors.notes : null;
  const distanceErrors = errors ? errors.distance : null;
  const durationErrors = errors ? errors.duration : null;
  const elevationDeltaErrors = errors ? errors.elevation_delta : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isUpdated,
    notesErrors,
    distanceErrors,
    durationErrors,
    elevationDeltaErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(RunEntry);
