import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GridView from '@/components/shared/GridView';

import { getLifts,
        createLift,
        updateLift,
        createLiftReset,
        updateLiftReset } from '@/store/actions';

class LiftList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  createLift(newLiftData) {
    const { dispatch } = this.props;

    const liftData = {
      ...newLiftData,
      is_active: true,
    };

    dispatch(createLift(liftData)).then(
      () => {
        this.dispatchGetLiftsIfCreatedOrUpdated();
      },
      (error) => {
        console.error('Error Creating Lift', error); // eslint-disable-line
      });
  }

  inactivateLift(liftData) {
    const inactivatedLift = {
      ...liftData,
      is_active: false,
    };

    this.updateLift(inactivatedLift);
  }

  updateLift(updatedLiftData) {
    const { dispatch } = this.props;

    dispatch(updateLift(updatedLiftData)).then(
      () => {
        this.dispatchGetLiftsIfCreatedOrUpdated();
      },
      (error) => {
        console.log('Error updating lift', error); //eslint-disable-line
      });
  }

  dispatchGetLiftsIfCreatedOrUpdated() {
    const { dispatch, isCreated, isUpdated } = this.props;

    if (isCreated || isUpdated) {
      dispatch(getLifts());
    }
  }

  dispatchResetCreate() {
    const { dispatch } = this.props;

    dispatch(createLiftReset());
  }

  dispatchResetUpdate() {
    const { dispatch } = this.props;

    dispatch(updateLiftReset());
  }

  render() {
    const {
      isFetchingList,
      received,
      lifts,
      creationErrors,
      updateErrors,
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
            onCreateRecord={newLiftData => this.createLift(newLiftData)}
            onUpdateRecord={liftData => this.updateLift(liftData)}
            onDeleteRecord={liftData => this.inactivateLift(liftData)}
            creationErrors={creationErrors}
            updateErrors={updateErrors}
            onCreateReset={() => this.dispatchResetCreate()}
            onUpdateReset={() => this.dispatchResetUpdate()}
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
  isUpdated: PropTypes.bool.isRequired,
  lifts: PropTypes.array.isRequired, // eslint-disable-line
  creationErrors: PropTypes.object, // eslint-disable-line
  updateErrors: PropTypes.object, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftList, liftCreation, liftUpdate } = state;
  const lifts = liftList.data;
  const { received } = liftList;
  const isFetchingList = liftList.isFetching;

  const { isCreated } = liftCreation;
  const creationErrors = liftCreation.errors;

  const { isUpdated } = liftUpdate;
  const updateErrors = liftUpdate.errors;

  return {
    isFetchingList,
    isCreated,
    isUpdated,
    received,
    lifts,
    creationErrors,
    updateErrors,
  };
}

export default connect(mapStateToProps)(LiftList);
