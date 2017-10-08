import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SetList from '@/components/workouts/liftEntry/set/SetList';
import Errors from '@/components/global/Errors';
import ManageLifts from '@/components/workouts/lift/ManageLifts';

import { updateLiftEntry, updateLiftEntryReset, getLifts, getLiftEntries } from '@/store/actions';

class LiftEntry extends Component {

  constructor(props) {
    super(props);

    const liftID = props.liftID;
    const notes = props.notes;

    this.defaultState = {
      updateView: false,
      liftID,
      notes,
    };

    this.state = this.defaultState;

    this.handleLiftChange = this.handleLiftChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  onUpdateLiftEntryClick() {
    const liftEntryData = this.getCurrentLiftEntryData();

    this.dispatchUpdateLiftEntry(liftEntryData);
  }

  onDeleteLiftEntryClick() {
    const currentLiftEntryData = this.getCurrentLiftEntryData();
    const liftEntryData = {
      ...currentLiftEntryData,
      is_active: false,
    };

    this.dispatchUpdateLiftEntry(liftEntryData);
  }

  onCancelUpdateClick() {
    const { dispatch } = this.props;

    dispatch(updateLiftEntryReset());

    this.setState(this.defaultState);
  }

  setUpdateView() {
    this.setState({ updateView: true });
  }

  getCurrentLiftEntryData() {
    const lift = this.state.liftID;
    const notes = this.state.notes;

    return {
      lift,
      notes,
      is_active: true,
    };
  }

  dispatchGetLiftEntriesIfUpdated() {
    const { dispatch, workoutID, isUpdated } = this.props;

    if (isUpdated) {
      dispatch(getLiftEntries(workoutID));
    }
  }

  dispatchUpdateLiftEntry(liftEntryData) {
    const { liftEntryID, dispatch } = this.props;

    dispatch(updateLiftEntry(liftEntryID, liftEntryData)).then(
      () => {
        this.dispatchGetLiftEntriesIfUpdated();
      });
  }

  handleLiftChange(event) {
    this.setState({ liftID: event.target.value });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  render() {
    const {
      dispatch,
      liftEntryID,
      liftID,
      notes,
      lifts,
      liftErrors,
      notesErrors,
      nonFieldErrors,
    } = this.props;

    const matchingLiftRecord = lifts.filter(lift => lift.id === liftID)[0];
    let liftDisplay;
    if (matchingLiftRecord) {
      liftDisplay = matchingLiftRecord.name;
    } else {
      liftDisplay = '';
    }

    return (
      <div className="card">
        <div className="card-content">
          { !this.state.updateView &&
            <div className="columns">
              <div className="column is-9">
                <h1 className="title">{ liftDisplay }</h1>
                { (notes && notes !== '') &&
                  <div>
                    <h2>Notes</h2>
                    <p>{notes}</p>
                  </div>
                }
              </div>
              <div className="column is-3">
                <button className="button is-info" onClick={() => this.setUpdateView()}>
                  <span className="icon">
                    <i className="fa fa-edit" />
                  </span>
                </button>
                <button className="button is-danger" onClick={() => this.onDeleteLiftEntryClick()}>
                  <span className="icon">
                    <i className="fa fa-close" />
                  </span>
                </button>
              </div>
            </div>
          }
          { this.state.updateView &&
            <div>
              <div className="field columns">
                <div className="column">
                  <label className="label" htmlFor="liftEdit">Lift</label>
                  <div className="control">
                    <div className={liftErrors ? 'select is-danger' : 'select'}>
                      <select id="liftEdit" value={this.state.liftID} onChange={this.handleLiftChange} >
                        <option value="">Select a lift</option>
                        {lifts.map((lift) => {
                          const liftSelectionID = lift.id;
                          const liftName = lift.name;

                          return (
                            <option
                              key={liftSelectionID}
                              value={liftSelectionID}
                            >
                              {liftName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {liftErrors &&
                      <Errors errors={liftErrors} />
                    }
                    <ManageLifts dispatch={dispatch} />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="notesEdit">Notes</label>
                <div className="control">
                  <input
                    id="notesEdit"
                    className={notesErrors ? 'input is-danger' : 'input'}
                    type="text"
                    value={this.state.notes}
                    onChange={this.handleNotesChange}
                    placeholder="notes"
                  />
                </div>
                {notesErrors &&
                  <Errors errors={notesErrors} />
                }
              </div>
              {nonFieldErrors &&
                <Errors errors={nonFieldErrors} />
              }
              <div className="field">
                <button className="button is-success" onClick={() => this.onUpdateLiftEntryClick()}>Save Changes</button>
              </div>
              <div className="field">
                <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
              </div>
            </div>
          }
          <hr />
          <SetList dispatch={dispatch} liftEntryID={liftEntryID} />
        </div>
      </div>
    );
  }
}

LiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  liftID: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  lifts: PropTypes.array.isRequired, // eslint-disable-line
  workoutID: PropTypes.number.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  liftErrors: PropTypes.array, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftEntryUpdate, liftList } = state;
  const lifts = liftList.data;

  const { isUpdated, errors } = liftEntryUpdate;

  const liftErrors = errors ? errors.lift : null;
  const notesErrors = errors ? errors.notes : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    lifts,
    isUpdated,
    liftErrors,
    notesErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(LiftEntry);
