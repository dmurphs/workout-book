// CreateRunEntry.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { createRunEntry, createRunEntryReset, getRunEntries } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      showForm: false,
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

  dispatchGetRunEntriesIfCreated() {
    const { workoutID, dispatch, isCreated } = this.props;

    if (isCreated) {
      dispatch(getRunEntries(workoutID));
    }
  }

  handleRunEntryCancelClick() {
    const { dispatch } = this.props;

    dispatch(createRunEntryReset());

    this.setState(this.defaultState);
  }

  handleRunEntryCreateClick() {
    const { dispatch, workoutID } = this.props;

    const runEntryData = {
      notes: this.state.notes,
      distance: this.state.distance,
      duration: this.state.duration,
      elevation_delta: this.state.elevationDelta,
      is_active: true,
    };

    dispatch(createRunEntry(workoutID, runEntryData)).then(
      () => {
        this.dispatchGetRunEntriesIfCreated();
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
      notesErrors,
      distanceErrors,
      durationErrors,
      elevationDeltaErrors,
      nonFieldErrors,
    } = this.props;
    const showForm = this.state.showForm;

    return (
      <div>
        { showForm &&
          <div>
            <h2>Create New Run Entry</h2>
            <div className="field">
              <input
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
            <div className="field">
              <input
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
            <div className="field">
              <input
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
            <div className="field">
              <input
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
            {nonFieldErrors &&
              <Errors errors={nonFieldErrors} />
            }
            <div className="field">
              <button className="button is-success" onClick={() => this.handleRunEntryCreateClick()}>Create Run Entry</button>
              <button className="button is-warning" onClick={() => this.handleRunEntryCancelClick()}>Cancel</button>
            </div>
          </div>
        }
        { !showForm &&
          <button className="button is-info" onClick={() => this.setState({ showForm: true })}>Add Run Entry</button>
        }
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  isCreated: PropTypes.bool.isRequired,
  notesErrors: PropTypes.array, // eslint-disable-line
  distanceErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  elevationDeltaErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryCreation } = state;

  const { isCreated, errors } = runEntryCreation;

  const notesErrors = errors ? errors.notes : null;
  const distanceErrors = errors ? errors.distance : null;
  const durationErrors = errors ? errors.duration : null;
  const elevationDeltaErrors = errors ? errors.elevation_delta : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isCreated,
    notesErrors,
    distanceErrors,
    durationErrors,
    elevationDeltaErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(CreateLiftEntry);
