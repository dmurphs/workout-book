import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateRunEntry from '@/components/workouts/CreateRunEntry';
import RunEntry from '@/components/workouts/RunEntry';

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
        <h1 className="subtitle">Run Entries</h1>
        { isFetching &&
          <h1>Loading Run Entries...</h1>
        }
        { received &&
          <div>
            <ul>
              {runEntries.map(runEntry => (
                <li key={runEntry.id}>
                  <RunEntry
                    runEntryID={runEntry.id}
                    notes={runEntry.notes}
                    distance={runEntry.distance}
                    duration={runEntry.duration}
                    elevationDelta={runEntry.elevation_delta}
                    onUpdate={() => this.updateComponent()}
                    dispatch={dispatch}
                  />
                </li>
              ))}
            </ul>
            <h2>Create New Run Entry</h2>
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
