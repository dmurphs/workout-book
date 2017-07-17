import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LiftEntryList from '@/components/workouts/LiftEntryList';
import RunEntryList from '@/components/workouts/RunEntryList';

import { getWorkoutDetail, updateWorkout } from '@/store/actions';

class Workout extends Component {

  constructor(props) {
    super(props);

    const date = '';
    const description = '';

    this.state = {
      udpateView: false,
      description,
      date,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentWillMount() {
    this.updateComponent();
  }

  onUpdateWorkoutClick() {
    const { dispatch, workoutID } = this.props;

    const workoutData = {
      date: this.state.date,
      description: this.state.description,
    };

    dispatch(updateWorkout(workoutID, workoutData)).then(
      () => {
        this.setState({ updateView: false });
        this.updateComponent();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  onCancelUpdateClick() {
    this.setState({ updateView: false });
  }

  setUpdateView() {
    const { workoutID, workoutDetailByWorkoutID } = this.props;

    let date;
    let description;
    if (workoutID in workoutDetailByWorkoutID) {
      const workout = workoutDetailByWorkoutID[workoutID];

      date = workout.date;
      description = workout.description;
    } else {
      date = '';
      description = '';
    }

    this.setState({ updateView: true, date, description });
  }

  updateComponent() {
    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID));
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const { isFetching, received, dispatch, workoutID, workoutDetailByWorkoutID } = this.props;

    let date;
    let description;
    if (workoutID in workoutDetailByWorkoutID) {
      const workout = workoutDetailByWorkoutID[workoutID];

      date = workout.date;
      description = workout.description;
    } else {
      date = null;
      description = null;
    }

    const descriptionText = description || '(No Description)';

    return (
      <div>
        { isFetching &&
          <h1>Loading Workout...</h1>
        }
        { received &&
          <div>
            { !this.state.updateView &&
              <div>
                <h1>{date} - {descriptionText}</h1>
                <button onClick={() => this.setUpdateView()}>Update</button>
              </div>
            }
            { this.state.updateView &&
              <div>
                <input type="date" value={this.state.date} onChange={this.handleDateChange} placeholder="date" />
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="description" />
                <button onClick={() => this.onUpdateWorkoutClick()}>Save Changes</button>
                <button onClick={() => this.onCancelUpdateClick()}>Cancel</button>
              </div>
            }
            <LiftEntryList workoutID={workoutID} dispatch={dispatch} />
            <RunEntryList workoutID={workoutID} dispatch={dispatch} />
          </div>
        }
      </div>
    );
  }
}

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  workoutDetailByWorkoutID: PropTypes.object.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { workoutDetail } = state;
  const { isFetching, received, workoutDetailByWorkoutID } = workoutDetail;

  return {
    isFetching,
    received,
    workoutDetailByWorkoutID,
  };
}

export default connect(mapStateToProps)(Workout);
