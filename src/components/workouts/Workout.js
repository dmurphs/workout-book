import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LiftEntryList from '@/components/workouts/LiftEntryList';
import RunEntryList from '@/components/workouts/RunEntryList';

import { getWorkoutDetail } from '@/store/actions';

export default class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      date: '',
    };
  }

  componentWillMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID)).then(
      (success) => {
        const response = success.response;
        const description = response.description;
        const date = response.date;
        this.setState({ description, date });
      });
  }

  render() {
    const { dispatch, workoutID } = this.props;

    const description = this.state.description;
    const date = this.state.date;

    const descriptionText = description || '(No Description)';

    return (
      <div>
        <h1>{date} - {descriptionText}</h1>
        <LiftEntryList workoutID={workoutID} dispatch={dispatch} />
        <RunEntryList workoutID={workoutID} dispatch={dispatch} />
      </div>
    );
  }
}

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
};
