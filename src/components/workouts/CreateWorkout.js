// components/workouts/CreateWorkout.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateWorkout extends Component {

  handleClick() {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const workoutData = {
      date: today,
    };
    this.props.onCreateClick(workoutData);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>

        { isAuthenticated &&
          <div>
            <button onClick={() => this.handleClick()}>
              New Workout
            </button>
          </div>
        }

        { !isAuthenticated &&
          <h1>Please Login to create a workout</h1>
        }

      </div>
    );
  }
}

CreateWorkout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};
