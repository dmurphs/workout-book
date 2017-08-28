import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ManageLifts from '@/components/workouts/ManageLifts';
import Errors from '@/components/global/Errors';

import { getLifts, getLiftEntries, createLiftEntry, createLiftEntryReset } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      showForm: false,
      selectedLift: '',
      notes: '',
    };

    this.state = this.defaultState;

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleLiftChange = this.handleLiftChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  dispatchGetLiftEntriesIfCreated() {
    const { dispatch, workoutID, isCreated } = this.props;

    if (isCreated) {
      dispatch(getLiftEntries(workoutID));
    }
  }

  handleCancelLiftEntryCreateClick() {
    const { dispatch } = this.props;

    dispatch(createLiftEntryReset());

    this.setState({ showForm: false });
  }

  handleLiftEntryCreateClick() {
    const { dispatch, workoutID } = this.props;

    const liftEntryData = {
      notes: this.state.notes,
      lift: this.state.selectedLift,
      is_active: true,
    };

    // this.setState({ showForm: false });

    dispatch(createLiftEntry(workoutID, liftEntryData)).then(
      () => {
        this.dispatchGetLiftEntriesIfCreated();
      });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleLiftChange(event) {
    this.setState({ selectedLift: event.target.value });
  }

  render() {
    const { dispatch, lifts, liftErrors, notesErrors, nonFieldErrors } = this.props;
    const { showForm } = this.state;

    return (
      <div>
        { showForm &&
        <div>
          <h2>Create New Lift Entry</h2>
          <div className="columns field">
            <div className="column is-4">
              <div className={liftErrors ? 'select is-danger' : 'select'}>
                <select value={this.state.selectedLift} onChange={this.handleLiftChange} >
                  <option value="">Select a lift</option>
                  {lifts.map((lift) => {
                    const liftID = lift.id;
                    const liftName = lift.name;

                    return (
                      <option key={liftID} value={liftID}>{liftName}</option>
                    );
                  })}
                </select>
              </div>
              {liftErrors &&
                <Errors errors={liftErrors} />
              }
            </div>
            <div className="column is-4">
              <ManageLifts dispatch={dispatch} />
            </div>
          </div>
          <div className="field">
            <input className={notesErrors ? 'input is-danger' : 'input'} type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="notes" />
            {notesErrors &&
              <Errors errors={notesErrors} />
            }
          </div>
          {nonFieldErrors &&
            <Errors errors={nonFieldErrors} />
          }
          <div className="field">
            <button className="button is-success" onClick={() => this.handleLiftEntryCreateClick()}>Create Lift Entry</button>
            <button className="button is-warning" onClick={() => this.handleCancelLiftEntryCreateClick()}>Cancel</button>
          </div>
        </div>
        }
        { !showForm &&
          <button className="button is-info" onClick={() => this.setState({ showForm: true })}>Add Lift Entry</button>
        }
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  lifts: PropTypes.array, // eslint-disable-line
  isCreated: PropTypes.bool.isRequired,
  liftErrors: PropTypes.array, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftEntryCreation, liftList } = state;
  const lifts = liftList.data;

  const { isCreated, errors } = liftEntryCreation;

  const liftErrors = errors ? errors.lift : null;
  const notesErrors = errors ? errors.notes : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    lifts,
    isCreated,
    liftErrors,
    notesErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(CreateLiftEntry);
