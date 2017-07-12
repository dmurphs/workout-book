import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SetList from '@/components/workouts/SetList';

import { getLiftEntries } from '@/store/actions';

class LiftEntryList extends Component {

  componentDidMount() {
    const { dispatch, workoutID } = this.props;

    dispatch(getLiftEntries(workoutID));
  }

  render() {
    const { isFetching, received, liftEntries, dispatch } = this.props;

    return (
      <div>
        { isFetching &&
          <h1>Loading Lift Entries</h1>
        }
        { received &&
          <ul>
            {liftEntries.map(liftEntry => (
              <li key={liftEntry.id}>
                {liftEntry.lift.name} - {liftEntry.notes}
                <SetList dispatch={dispatch} liftEntryID={liftEntry.id} />
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

LiftEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  liftEntries: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftEntryList } = state;
  const { isFetching, received, data } = liftEntryList;

  const liftEntries = data;

  return {
    isFetching,
    received,
    liftEntries,
  };
}

export default connect(mapStateToProps)(LiftEntryList);
