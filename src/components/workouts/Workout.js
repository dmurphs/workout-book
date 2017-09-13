import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';
import LiftEntryList from '@/components/workouts/LiftEntryList';
import RunEntryList from '@/components/workouts/RunEntryList';

import { getWorkoutDetail, updateWorkout, updateWorkoutReset } from '@/store/actions';

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
    const { dispatch, workoutID } = this.props;

    dispatch(getWorkoutDetail(workoutID));
  }

  onUpdateWorkoutClick() {
    const { dispatch, workoutID } = this.props;

    const workoutData = {
      date: this.state.date,
      description: this.state.description,
      is_active: true,
    };

    dispatch(updateWorkout(workoutID, workoutData)).then(
      () => {
        this.dispatchGetWorkoutIfUpdated();
      });
  }

  onCancelUpdateClick() {
    const { dispatch } = this.props;

    dispatch(updateWorkoutReset());

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

  dispatchGetWorkoutIfUpdated() {
    const { dispatch, workoutID, isUpdated } = this.props;

    if (isUpdated) {
      dispatch(getWorkoutDetail(workoutID));
      this.setState({ updateView: false });
    }
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const {
      isFetching,
      received,
      dispatch,
      workoutID,
      workoutDetailByWorkoutID,
      dateErrors,
      descriptionErrors,
      nonFieldErrors,
    } = this.props;

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
      <div className="column is-8 is-offset-2">
        { isFetching &&
          <h1>Loading Workout...</h1>
        }
        { received &&
          <div>
            { !this.state.updateView &&
              <div className="columns">
                <div className="column is-8">
                  <h1 className="title">{date}</h1>
                  <h2>{descriptionText}</h2>
                </div>
                <div className="column is-4">
                  <button className="button is-info" onClick={() => this.setUpdateView()}>Edit Workout Info</button>
                </div>
              </div>
            }
            { this.state.updateView &&
              <div>
                <div className="field">
                  <label className="label" htmlFor="dateEdit">Date</label>
                  <div className="control">
                    <input
                      id="dateEdit"
                      className={dateErrors ? 'input is-danger' : 'input'}
                      type="date"
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      placeholder="date"
                    />
                  </div>
                  {dateErrors &&
                    <Errors errors={dateErrors} />
                  }
                </div>
                <div className="field">
                  <label className="label" htmlFor="descriptionEdit">Description</label>
                  <div className="control">
                    <textarea
                      id="descriptionEdit"
                      className={descriptionErrors ? 'input is-danger' : 'input'}
                      type="text"
                      value={this.state.description}
                      onChange={this.handleDescriptionChange}
                      placeholder="description"
                    />
                    {descriptionErrors &&
                      <Errors errors={descriptionErrors} />
                    }
                  </div>
                </div>
                {nonFieldErrors &&
                  <Errors errors={nonFieldErrors} />
                }
                <div className="field">
                  <button className="button is-success" onClick={() => this.onUpdateWorkoutClick()}>Save Changes</button>
                </div>
                <div className="field">
                  <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
                </div>
              </div>
            }
            <hr />
            <LiftEntryList workoutID={workoutID} dispatch={dispatch} />
            <hr />
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
  isUpdated: PropTypes.bool.isRequired,
  workoutDetailByWorkoutID: PropTypes.object.isRequired, // eslint-disable-line
  dateErrors: PropTypes.array, // eslint-disable-line
  descriptionErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { workoutDetail, workoutUpdate } = state;
  const { isFetching, received, workoutDetailByWorkoutID } = workoutDetail;
  const { isUpdated, errors } = workoutUpdate;

  const dateErrors = errors ? errors.date : null;
  const descriptionErrors = errors ? errors.description : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isFetching,
    received,
    isUpdated,
    workoutDetailByWorkoutID,
    dateErrors,
    descriptionErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(Workout);
