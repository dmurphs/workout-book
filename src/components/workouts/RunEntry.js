import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { updateRunEntry, updateRunEntryReset, getRunEntries, getRuns } from '@/store/actions';

class RunEntry extends Component {

  constructor(props) {
    super(props);

    const name = props.runName;
    const notes = props.notes;
    const distance = props.distance;
    const duration = props.duration;
    const elevationDelta = props.elevationDelta;
    const runID = props.runID;

    this.defaultState = {
      runID,
      name,
      updateView: false,
      notes,
      distance,
      duration,
      elevationDelta,
    };

    this.state = this.defaultState;

    this.handleRunChange = this.handleRunChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleElevationDeltaChange = this.handleElevationDeltaChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getRuns());
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
    const runID = this.state.runID;
    const notes = this.state.notes;
    const duration = this.state.duration;

    return {
      run_id: runID,
      notes,
      duration,
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

  handleRunChange(event) {
    const { runs } = this.props;

    const newRunID = parseInt(event.target.value, 10);

    const matchingRun = runs.find(run => run.id === newRunID);

    this.setState({
      runID: newRunID,
      name: matchingRun.name,
      distance: matchingRun.distance,
      elevationDelta: matchingRun.elevation_delta,
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
      runs,
      runName,
      notes,
      distance,
      duration,
      elevationDelta,
      notesErrors,
      // distanceErrors,
      durationErrors,
      // elevationDeltaErrors,
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
                  <td>Name</td>
                  <td>{runName}</td>
                </tr>
                <tr>
                  <td>Distance</td>
                  <td>{distance} miles</td>
                </tr>
                <tr>
                  <td>Elevation Delta</td>
                  <td>{elevationDelta} ft</td>
                </tr>
              </tbody>
            </table>

            <div>
              Duration: {duration}
            </div>

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
            <div className="control">
              <div className="select">
                <select id="runEdit" value={this.state.runID} onChange={this.handleRunChange} >
                  <option value="">Select a run</option>
                  {runs.map((run) => {
                    const runId = run.id;
                    const name = run.name;

                    return (
                      <option
                        key={runId}
                        value={runId}
                      >
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <h2>Selected Run Information</h2>
            <table className="table is-bordered is-striped">
              <tbody>
                <tr>
                  <td>Distance</td>
                  <td>{this.state.distance} miles</td>
                </tr>
                <tr>
                  <td>Elevation Delta</td>
                  <td>{this.state.elevationDelta} ft</td>
                </tr>
              </tbody>
            </table>

            <hr />

            <div className="field">
              <label htmlFor="duration" className="label">Duration (hh:mm:ss)</label>
              <div className="control">
                <input
                  id="duration"
                  className={durationErrors ? 'input is-danger' : 'input'}
                  type="text"
                  value={this.state.duration}
                  onChange={this.handleDurationChange}
                  placeholder="duration (hh:mm:ss)"
                />
                {notesErrors &&
                  <Errors errors={notesErrors} />
                }
              </div>
            </div>
            <div className="field">
              <label htmlFor="editNotes" className="label">Notes</label>
              <div className="control">
                <textarea
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
  runID: PropTypes.number.isRequired,
  runName: PropTypes.string.isRequired,
  workoutID: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  elevationDelta: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired, // eslint-disable-line
  runs: PropTypes.array.isRequired, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  // distanceErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  // elevationDeltaErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryUpdate, runList } = state;
  const runs = runList.data;

  const { isUpdated, errors } = runEntryUpdate;

  const notesErrors = errors ? errors.notes : null;
  // const distanceErrors = errors ? errors.distance : null;
  const durationErrors = errors ? errors.duration : null;
  // const elevationDeltaErrors = errors ? errors.elevation_delta : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    runs,
    isUpdated,
    notesErrors,
    // distanceErrors,
    durationErrors,
    // elevationDeltaErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(RunEntry);
