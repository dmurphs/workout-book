import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLifts, createLiftEntry } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      selectedLift: '',
      notes: '',
    };

    this.state = this.defaultState;

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleLiftChange = this.handleLiftChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  handleLiftEntryCreateClick() {
    const { dispatch, workoutID, onWorkoutCreated } = this.props;

    const liftEntryData = {
      notes: this.state.notes,
      lift: this.state.selectedLift,
      is_active: true,
    };

    dispatch(createLiftEntry(workoutID, liftEntryData)).then(
      () => {
        onWorkoutCreated();
      });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleLiftChange(event) {
    this.setState({ selectedLift: event.target.value });
  }

  render() {
    const { lifts } = this.props;

    return (
      <div>
        <div className="field">
          <div className="select">
            <select value={this.state.selectedLift} onChange={this.handleLiftChange} >
              <option value="">Select a lift</option>
              {lifts.map((lift) => {
                const liftID = lift.id;
                const liftName = lift.name;

                return (
                  <option key={liftID} value={liftID}>{liftName}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="field">
          <input className="input" type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="notes" />
        </div>
        <div className="field">
          <button className="button is-success" onClick={() => this.handleLiftEntryCreateClick()}>Create Lift Entry</button>
        </div>
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  onWorkoutCreated: PropTypes.func.isRequired,
  lifts: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftList } = state;
  const lifts = liftList.data;

  return {
    lifts,
  };
}

export default connect(mapStateToProps)(CreateLiftEntry);
