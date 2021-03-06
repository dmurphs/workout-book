import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import WorkoutList from '@/components/workouts/WorkoutList';

import { createWorkout } from '@/store/actions';

export default class Dashboard extends Component {

  handleWorkoutCreateClick() {
    const { dispatch } = this.props;

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const workoutData = {
      date: today,
      is_active: true,
    };

    dispatch(createWorkout(workoutData)).then(
      (success) => {
        const response = success.response;
        const workoutID = response.id;

        dispatch(push(`/workout/${workoutID}`));
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        <div className="columns">
          <div className="column">
            <h1>My Workouts</h1>
          </div>
          <div className="column">
            <button className="button is-link" onClick={() => this.handleWorkoutCreateClick()}>Create New Workout</button>
          </div>
        </div>
        <WorkoutList dispatch={dispatch} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
