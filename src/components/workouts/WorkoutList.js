import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkouts, updateWorkout } from '@/store/actions';

function pad(num, digits) {
  const strNum = `${num}`;
  return strNum.length >= digits
    ? strNum
    : new Array((digits - strNum.length) + 1).join(0) + strNum;
}

class WorkoutList extends Component {

  constructor(props) {
    super(props);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const paddedStartYear = pad(oneWeekAgo.getFullYear(), 4);
    const paddedStartMonth = pad(oneWeekAgo.getMonth() + 1, 2);
    const paddedStartDate = pad(oneWeekAgo.getDate(), 2);
    const startDate = `${paddedStartYear}-${paddedStartMonth}-${paddedStartDate}`;

    const today = new Date();
    const paddedEndYear = pad(today.getFullYear(), 4);
    const paddedEndMonth = pad(today.getMonth() + 1, 2);
    const paddedEndDate = pad(today.getDate(), 2);
    const endDate = `${paddedEndYear}-${paddedEndMonth}-${paddedEndDate}`;

    this.state = {
      startDate,
      endDate,
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillMount() {
    this.updateComponent();
  }

  updateComponent() {
    const { dispatch } = this.props;

    const startDate = this.state.startDate;
    const endDate = this.state.endDate;

    const dateRangeData = {
      start_date: startDate,
      end_date: endDate,
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

  handleStartDateChange(event) {
    this.setState({ startDate: event.target.value });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.value });
  }

  render() {
    const { isFetching, received, workouts } = this.props;

    return (
      <div>
        { isFetching &&
          <h1>Loading Workouts...</h1>
        }
        { received &&
          <div>
            <div className="field">
              <label className="label" htmlFor="startDate">Start Date</label>
              <input
                className="input"
                id="startDate"
                type="date"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="endDate">End Date</label>
              <input
                className="input"
                id="endDate"
                type="date"
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
            </div>
            <button className="button" onClick={() => this.updateComponent()}>Submit</button>
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
                        <button className="button is-danger" onClick={() => this.deleteWorkout(workoutID)}>
                          <span className="icon">
                            <i className="fa fa-close" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
