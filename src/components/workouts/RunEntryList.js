import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRunEntries } from '@/store/actions';

export default class RunEntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runEntries: [],
    };
  }

  componentWillMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getRunEntries(workoutID)).then(
      (success) => {
        this.setState({ runEntries: success.response });
      });
  }

  render() {
    const runEntries = this.state.runEntries;

    return (
      <div>
        <ul>
          {runEntries.map(runEntry => (
            <li key={runEntry.id}>
              {runEntry.distance} - {runEntry.duration}
              - {runEntry.elevation_delta} - {runEntry.notes}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

RunEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
};
