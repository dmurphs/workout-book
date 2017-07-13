import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLifts, createLiftEntry } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLift: '',
      notes: '',
    };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleLiftChange = this.handleLiftChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  handleLiftEntryCreateClick() {
    const { dispatch, workoutID } = this.props;

    const liftEntryData = {
      notes: this.state.notes,
      lift: this.state.selectedLift,
    };

    console.log(liftEntryData) // eslint-disable-line

    dispatch(createLiftEntry(workoutID, liftEntryData));
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
        <input type="text" onChange={this.handleNotesChange} placeholder="notes" />
        <select onChange={this.handleLiftChange} >
          <option value="">Select a lift</option>
          {lifts.map((lift) => {
            const liftID = lift.id;
            const liftName = lift.name;

            return (
              <option key={liftID} value={liftID}>{liftName}</option>
            );
          })}
        </select>
        <button onClick={() => this.handleLiftEntryCreateClick()}>Create Lift Entry</button>
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
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
