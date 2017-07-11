// components/workouts/CreateWorkout.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createWorkout } from '@/store/actions';

class CreateWorkout extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const workoutData = {
      date: today,
    };
    dispatch(createWorkout(workoutData));
  }

  render() {
    const { created, id, isFetching } = this.props;

    const redirectURL = `/workout/${id}`;

    return (
      <div>
        { created &&
          <Redirect to={redirectURL} />
        }

        { isFetching &&
          <h1>Creating Workout...</h1>
        }
      </div>
    );
  }
}

CreateWorkout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  created: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { workoutCreation } = state;
  const { created, data, isFetching } = workoutCreation;

  const id = data.id;

  return {
    created,
    id,
    isFetching,
  };
}

export default connect(mapStateToProps)(CreateWorkout);
