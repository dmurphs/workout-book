// CreateRunEntry.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RunEntryForm from '@/components/workouts/runEntry/RunEntryForm';

import { createRunEntry, createRunEntryReset, getRunEntries } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      showForm: false,
      notes: null,
      duration: null,
      runID: null,
    };

    this.state = this.defaultState;
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
      run_id: this.state.runID,
      duration: this.state.duration,
      is_active: true,
    };

    dispatch(createRunEntry(workoutID, runEntryData)).then(
      () => {
        this.dispatchGetRunEntriesIfCreated();
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
      runIDErrors,
      notesErrors,
      durationErrors,
      nonFieldErrors,
    } = this.props;
    const showForm = this.state.showForm;

    return (
      <div>
        { showForm &&
          <div>
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
            <button className="button is-success" onClick={() => this.handleRunEntryCreateClick()}>Create Run Entry</button>
            <button className="button is-warning" onClick={() => this.handleRunEntryCancelClick()}>Cancel</button>
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
  runIDErrors: PropTypes.array, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
  runs: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryCreation, runList } = state;

  const runs = runList.data;
  const { isCreated, errors } = runEntryCreation;

  const runIDErrors = errors ? errors.run_id : null;
  const notesErrors = errors ? errors.notes : null;
  const durationErrors = errors ? errors.duration : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    runs,
    isCreated,
    runIDErrors,
    notesErrors,
    durationErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(CreateLiftEntry);
