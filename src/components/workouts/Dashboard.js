import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { createWorkout } from '@/store/actions';

export default class Dashboard extends Component {

  handleWorkoutCreateClick() {
    const { dispatch } = this.props;

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const workoutData = {
      date: today,
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
    return (
      <div>
        <button onClick={() => this.handleWorkoutCreateClick()}>Create New Workout</button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
