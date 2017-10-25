import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GridView from '@/components/shared/GridView';
// import CreateLiftRow from '@/components/workouts/CreateLiftRow';
// import LiftRow from '@/components/workouts/LiftRow';

import { getLifts, createLift, updateLift } from '@/store/actions';

class LiftList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  onCreateLift(newLiftData) {
    const { dispatch } = this.props;

    const liftData = {
      ...newLiftData,
      is_active: true,
    };

    dispatch(createLift(liftData)).then(
      () => {
        this.dispatchGetLiftsIfCreated();
      },
      (error) => {
        console.error('Error Creating Lift', error); // eslint-disable-line
      });
  }

  onUpdateLift(updatedLiftData) {
    const { dispatch } = this.props;

    dispatch(updateLift(updatedLiftData)).then(
      () => {
        dispatch(getLifts());
      },
      (error) => {
        console.log('Error updating lift', error); //eslint-disable-line
      });
  }

  getUpdateState() {
    const { lifts } = this.props;

    return lifts;
  }

  getLiftById(liftID) {
    const { lifts } = this.props;

    return lifts.find(lift => lift.id === liftID);
  }

  dispatchGetLiftsIfCreated() {
    const { dispatch, isCreated } = this.props;

    if (isCreated) {
      dispatch(getLifts());
    }
  }

  render() {
    const {
      isFetchingList,
      received,
      lifts,
      // dispatch,
    } = this.props;

    const fields = [
      { name: 'name', type: 'text' },
      { name: 'description', type: 'text' },
    ];

    return (
      <div>
        { isFetchingList &&
          <p>Loading...</p>
        }
        { received &&
          <GridView
            records={lifts}
            displayFields={fields}
            onCreateRecord={newLiftData => this.onCreateLift(newLiftData)}
            onUpdateRecord={liftData => this.onUpdateLift(liftData)}
          />
        }
      </div>
    );
  }
}

LiftList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetchingList: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  lifts: PropTypes.array.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftList, liftCreation } = state;
  const lifts = liftList.data;
  const { received } = liftList;
  const isFetchingList = liftList.isFetching;

  const { isCreated } = liftCreation;

  return {
    isFetchingList,
    isCreated,
    received,
    lifts,
  };
}

export default connect(mapStateToProps)(LiftList);
