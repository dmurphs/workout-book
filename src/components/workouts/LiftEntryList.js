import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateLiftEntry from '@/components/workouts/CreateLiftEntry';
import LiftEntry from '@/components/workouts/LiftEntry';

import { getLiftEntries } from '@/store/actions';

class LiftEntryList extends Component {

  componentWillMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getLiftEntries(workoutID));
  }

  render() {
    const {
      isFetching,
      received,
      liftEntriesByWorkoutID,
      dispatch,
      workoutID } = this.props;

    let liftEntries;
    if (workoutID in liftEntriesByWorkoutID) {
      liftEntries = liftEntriesByWorkoutID[workoutID];
    } else {
      liftEntries = [];
    }

    return (
      <div>
        <h1 className="subtitle">Lift Entries</h1>
        { isFetching &&
          <h1>Loading Lift Entries...</h1>
        }
        { received &&
          <div>
            {liftEntries.map(liftEntry => (
              <LiftEntry
                key={liftEntry.id}
                dispatch={dispatch}
                liftEntryID={liftEntry.id}
                liftID={liftEntry.lift}
                notes={liftEntry.notes}
                workoutID={workoutID}
              />
            ))}
            <CreateLiftEntry
              workoutID={workoutID}
              dispatch={dispatch}
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
  liftEntriesByWorkoutID: PropTypes.object.isRequired, // eslint-disable-line
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
