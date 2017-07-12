import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRunEntries } from '@/store/actions';

class RunEntryList extends Component {

  componentDidMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getRunEntries(workoutID));
  }

  render() {
    const { isFetching, received, runEntries } = this.props;

    return (
      <div>
        { isFetching &&
          <h1>Loading Run Entries</h1>
        }
        { received &&
          <ul>
            {runEntries.map(runEntry => (
              <li key={runEntry.id}>
                {runEntry.distance} - {runEntry.duration}
                - {runEntry.elevation_delta} - {runEntry.notes}
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

RunEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  runEntries: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runEntryList } = state;
  const { isFetching, received, data } = runEntryList;

  const runEntries = data;

  return {
    isFetching,
    received,
    runEntries,
  };
}

export default connect(mapStateToProps)(RunEntryList);
