import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getWorkoutDetail } from '@/store/actions';

class Workout extends Component {

  componentDidMount() {
    console.log('component mounted'); // eslint-disable-line

    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID));
  }

  render() {
    const { isFetching, received, description, date } = this.props;

    const descriptionText = description || '(No Description)';

    return (
      <div>
        { isFetching &&
          <h1>Loading Workout</h1>
        }
        { received &&
          <h1>{date} - {descriptionText}</h1>
        }
      </div>
    );
  }
}

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
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
