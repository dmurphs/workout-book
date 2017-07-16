import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkouts } from '@/store/actions';

class WorkoutList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoStr = `${oneWeekAgo.getFullYear()}-${oneWeekAgo.getMonth() + 1}-${oneWeekAgo.getDate()}`;

    const dateRangeData = {
      start_date: oneWeekAgoStr,
      end_date: todayStr,
    };

    dispatch(getWorkouts(dateRangeData));
  }

  render() {
    const { isFetching, received, workouts } = this.props;

    return (
      <div>
        { isFetching &&
          <h1>Loading Workouts...</h1>
        }
        { received &&
          <ul>
            {workouts.map((workout) => {
              const workoutID = workout.id;
              const workoutDetailURL = `/workout/${workoutID}`;
              const descriptionText = workout.description || '(No Description)';

              return (
                <li key={workout.id}>
                  <Link to={workoutDetailURL}>{workout.date} - {descriptionText}</Link>
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
}

WorkoutList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  workouts: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { workoutList } = state;
  const { isFetching, received, data } = workoutList;

  const workouts = data;

  return {
    isFetching,
    received,
    workouts,
  };
}

export default connect(mapStateToProps)(WorkoutList);
