// components/workouts/CreateWorkout.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateWorkout extends Component {

  handleClick() {
    const workoutName = this.workoutNameRef;
    const description = this.descriptionRef;
    const date = this.dateRef;
    const workoutData = {
      workoutName: workoutName.value.trim(),
      description: description.value.trim(),
      date: date.value.trim(),
    };
    this.props.onCreateClick(workoutData);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>

        { isAuthenticated &&
          <div>
            <input type="text" ref={(el) => { this.workoutNameRef = el; }} placeholder="Workout Name" />
            <input type="text" ref={(el) => { this.descriptionRef = el; }} placeholder="Description" />
            <input type="text" ref={(el) => { this.dateRef = el; }} placeholder="Date" />
            <button onClick={() => this.handleClick()}>
              Create Workout
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
