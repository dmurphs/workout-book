import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateSetRow from '@/components/workouts/CreateSetRow';
import SetRow from '@/components/workouts/SetRow';

import { getSets } from '@/store/actions';

class SetList extends Component {

  componentWillMount() {
    const { dispatch, liftEntryID } = this.props;

    dispatch(getSets(liftEntryID));
  }

  render() {
    const { isFetching, received, setsByLiftEntryID, dispatch, liftEntryID } = this.props;

    let sets;
    if (liftEntryID in setsByLiftEntryID) {
      sets = setsByLiftEntryID[liftEntryID];
    } else {
      sets = [];
    }

    const orderedSets = sets.sort((a, b) => a.set_num - b.set_num);

    return (
      <div>
        { isFetching &&
          <h1>Loading Sets...</h1>
        }
        { received &&
          <div>
            <h2>Sets</h2>
            <table className="table is-bordered is-striped">
              <tbody>
                <tr>
                  <th>Number of Reps</th>
                  <th>Weight (lbs)</th>
                </tr>
                {orderedSets.map(set => (
                  <SetRow
                    key={set.id}
                    setID={set.id}
                    numReps={set.num_reps}
                    weight={set.weight}
                    liftEntryID={liftEntryID}
                    dispatch={dispatch}
                  />
                ))}
                <CreateSetRow
                  liftEntryID={liftEntryID}
                  dispatch={dispatch}
                />
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

SetList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  setsByLiftEntryID: PropTypes.object.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { sets } = state;
  const { isFetching, received, setsByLiftEntryID } = sets;

  return {
    isFetching,
    received,
    setsByLiftEntryID,
  };
}

export default connect(mapStateToProps)(SetList);
