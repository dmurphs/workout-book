import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LiftEntryList from '@/components/workouts/LiftEntryList';
import RunEntryList from '@/components/workouts/RunEntryList';

import { getWorkoutDetail } from '@/store/actions';

class Workout extends Component {

  componentWillMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID));
  }

  render() {
    const { isFetching, received, dispatch, workoutID, workoutDetailByWorkoutID } = this.props;

    let date;
    let description;
    if (workoutID in workoutDetailByWorkoutID) {
      const workout = workoutDetailByWorkoutID[workoutID];

      date = workout.date;
      description = workout.description;
    } else {
      date = null;
      description = null;
    }

    const descriptionText = description || '(No Description)';

    return (
      <div>
        { isFetching &&
          <h1>Loading Workout...</h1>
        }
        { received &&
          <div>
            <h1>{date} - {descriptionText}</h1>
            <LiftEntryList workoutID={workoutID} dispatch={dispatch} />
            <RunEntryList workoutID={workoutID} dispatch={dispatch} />
          </div>
        }
      </div>
    );
  }
}

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  workoutDetailByWorkoutID: PropTypes.object.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { workoutDetail } = state;
  const { isFetching, received, workoutDetailByWorkoutID } = workoutDetail;

  return {
    isFetching,
    received,
    workoutDetailByWorkoutID,
  };
}

export default connect(mapStateToProps)(Workout);
