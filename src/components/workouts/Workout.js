import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LiftEntryList from '@/components/workouts/LiftEntryList';
import RunEntryList from '@/components/workouts/RunEntryList';
import CreateLiftEntry from '@/components/workouts/CreateLiftEntry';

import { getWorkoutDetail } from '@/store/actions';

class Workout extends Component {

  componentWillMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID));
  }

  render() {
    const { isFetching, received, description, date, dispatch, workoutID } = this.props;

    const descriptionText = description || '(No Description)';

    return (
      <div>
        { isFetching &&
          <h1>Loading Workout</h1>
        }
        { received &&
          <div>
            <h1>{date} - {descriptionText}</h1>
            <LiftEntryList workoutID={workoutID} dispatch={dispatch} />
            <CreateLiftEntry workoutID={workoutID} dispatch={dispatch} />
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
  description: PropTypes.string, // eslint-disable-line
  date: PropTypes.string, // eslint-disable-line
};

function mapStateToProps(state) {
  const { workoutDetail } = state;
  const { isFetching, received, data } = workoutDetail;

  const description = data.description;
  const date = data.date;

  return {
    isFetching,
    received,
    description,
    date,
  };
}

export default connect(mapStateToProps)(Workout);
