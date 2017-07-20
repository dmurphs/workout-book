import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkouts, updateWorkout } from '@/store/actions';

class WorkoutList extends Component {

  componentWillMount() {
    this.updateComponent();
  }

  updateComponent() {
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

  deleteWorkout(workoutID) {
    const { workouts, dispatch } = this.props;

    const workoutToDelete = workouts.filter(workout => workout.id === workoutID)[0];

    const workoutData = {
      description: workoutToDelete.description || '',
      date: workoutToDelete.date,
      is_active: false,
    };

    dispatch(updateWorkout(workoutID, workoutData)).then(
      () => {
        this.updateComponent();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  render() {
    const { isFetching, received, workouts } = this.props;

    return (
      <div>
        { isFetching &&
          <h1>Loading Workouts...</h1>
        }
        { received &&
          <table className="table is-bordered is-striped">
            <tbody>
              {workouts.map((workout) => {
                const workoutID = workout.id;
                const workoutDetailURL = `/workout/${workoutID}`;
                const descriptionText = workout.description || '(No Description)';

                return (
                  <tr key={workout.id}>
                    <td>
                      <Link to={workoutDetailURL}>{workout.date} - {descriptionText}</Link>
                    </td>
                    <td>
                      <button className="button is-danger" onClick={() => this.deleteWorkout(workoutID)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
