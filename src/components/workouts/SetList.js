import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateSet from '@/components/workouts/CreateSet';
import Set from '@/components/workouts/Set';

import { getSets } from '@/store/actions';

class SetList extends Component {

  componentWillMount() {
    this.updateComponent();
  }

  updateComponent() {
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
            <ul>
              {orderedSets.map(set => (
                <li key={set.id}>
                  <Set
                    setID={set.id}
                    numReps={set.num_reps}
                    weight={set.weight}
                    onUpdate={() => this.updateComponent()}
                    dispatch={dispatch}
                  />
                </li>
              ))}
            </ul>
            <hr />
            <CreateSet
              liftEntryID={liftEntryID}
              dispatch={dispatch}
            />
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
