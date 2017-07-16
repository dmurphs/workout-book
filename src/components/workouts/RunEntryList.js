import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateRunEntry from '@/components/workouts/CreateRunEntry';

import { getRunEntries } from '@/store/actions';

class RunEntryList extends Component {

  componentWillMount() {
    this.updateComponent();
  }

  updateComponent() {
    const { dispatch, workoutID } = this.props;

    dispatch(getRunEntries(workoutID));
  }

  render() {
    const { isFetching, received, runEntriesByWorkoutID, dispatch, workoutID } = this.props;

    let runEntries;
    if (workoutID in runEntriesByWorkoutID) {
      runEntries = runEntriesByWorkoutID[workoutID];
    } else {
      runEntries = [];
    }

    return (
      <div>
        { isFetching &&
          <h1>Loading Run Entries</h1>
        }
        { received &&
          <div>
            <ul>
              {runEntries.map(runEntry => (
                <li key={runEntry.id}>
                  {runEntry.distance} - {runEntry.duration}
                  - {runEntry.elevation_delta} - {runEntry.notes}
                </li>
              ))}
            </ul>
            <CreateRunEntry
              workoutID={workoutID}
              dispatch={dispatch}
              onRunCreated={() => this.updateComponent()}
            />
          </div>
        }
      </div>
    );
  }
}

RunEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  runEntriesByWorkoutID: PropTypes.object.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntries } = state;
  const { isFetching, received, runEntriesByWorkoutID } = runEntries;

  return {
    isFetching,
    received,
    runEntriesByWorkoutID,
  };
}

export default connect(mapStateToProps)(RunEntryList);
