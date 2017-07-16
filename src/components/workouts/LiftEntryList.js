import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SetList from '@/components/workouts/SetList';
import CreateLiftEntry from '@/components/workouts/CreateLiftEntry';

import { getLiftEntries } from '@/store/actions';

class LiftEntryList extends Component {

  componentWillMount() {
    this.updateComponent();
  }

  updateComponent() {
    const { dispatch, workoutID } = this.props;

    dispatch(getLiftEntries(workoutID));
  }

  render() {
    const { isFetching, received, liftEntriesByWorkoutID, dispatch, workoutID } = this.props;

    let liftEntries;
    if (workoutID in liftEntriesByWorkoutID) {
      liftEntries = liftEntriesByWorkoutID[workoutID];
    } else {
      liftEntries = [];
    }

    return (
      <div>
        { isFetching &&
          <h1>Loading Lift Entries</h1>
        }
        { received &&
          <div>
            <ul>
              {liftEntries.map(liftEntry => (
                <li key={liftEntry.id}>
                  {liftEntry.lift} - {liftEntry.notes}
                  <SetList dispatch={dispatch} liftEntryID={liftEntry.id} />
                </li>
              ))}
            </ul>
            <CreateLiftEntry
              workoutID={workoutID}
              dispatch={dispatch}
              onWorkoutCreated={() => this.updateComponent()}
            />
          </div>
        }
      </div>
    );
  }
}

LiftEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  liftEntriesByWorkoutID: PropTypes.object, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftEntries } = state;
  const { isFetching, received, liftEntriesByWorkoutID } = liftEntries;

  return {
    isFetching,
    received,
    liftEntriesByWorkoutID,
  };
}

export default connect(mapStateToProps)(LiftEntryList);
