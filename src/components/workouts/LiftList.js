import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateLift from '@/components/workouts/CreateLift';
import Lift from '@/components/workouts/Lift';

import { getLifts } from '@/store/actions';

class LiftList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  render() {
    const {
      isFetching,
      received,
      lifts,
      dispatch,
    } = this.props;

    return (
      <div>
        <h1 className="subtitle">Lifts</h1>
        { isFetching &&
          <h1>Loading Lifts...</h1>
        }
        { received &&
          <div>
            {lifts.map(lift => (
              <Lift
                key={lift.id}
                dispatch={dispatch}
                liftID={lift.id}
                name={lift.name}
                description={lift.description}
              />
            ))}
            <CreateLift dispatch={dispatch} />
          </div>
        }
      </div>
    );
  }
}

LiftList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  lifts: PropTypes.array.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftList } = state;
  const lifts = liftList.data;
  const { isFetching, received } = liftList;

  return {
    isFetching,
    received,
    lifts,
  };
}

export default connect(mapStateToProps)(LiftList);
