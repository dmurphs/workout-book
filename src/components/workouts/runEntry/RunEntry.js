import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RunEntryForm from '@/components/workouts/runEntry/RunEntryForm';

import { updateRunEntry, updateRunEntryReset, getRunEntries } from '@/store/actions';

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

  updateStateValue(key, value) {
    const updatedState = {
      ...this.state,
      [key]: value,
    };
    this.setState(updatedState);
  }

  render() {
    const {
      dispatch,
      runName,
      notes,
      distance,
      duration,
      elevationDelta,
      runIDErrors,
      notesErrors,
      durationErrors,
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
            <RunEntryForm
              dispatch={dispatch}
              runID={this.state.runID}
              notes={this.state.notes}
              duration={this.state.duration}
              onUpdateField={(key, value) => this.updateStateValue(key, value)}
              runIDErrors={runIDErrors}
              notesErrors={notesErrors}
              durationErrors={durationErrors}
              nonFieldErrors={nonFieldErrors}
            />
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
  workoutID: PropTypes.number.isRequired,
  runName: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  elevationDelta: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired, // eslint-disable-line
  runIDErrors: PropTypes.array, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryUpdate } = state;

  const { isUpdated, errors } = runEntryUpdate;

  const runIDErrors = errors ? errors.runID : null;
  const notesErrors = errors ? errors.notes : null;
  const durationErrors = errors ? errors.duration : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isUpdated,
    runIDErrors,
    notesErrors,
    durationErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(RunEntry);
