import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GridView from '@/components/shared/GridView';
// import CreateLiftRow from '@/components/workouts/CreateLiftRow';
// import LiftRow from '@/components/workouts/LiftRow';

import { getLifts, createLift } from '@/store/actions';

class LiftList extends Component {

  constructor(props) {
    super(props);

    this.defaultState = {
      create: {
        name: null,
        description: null,
      },
    };

    this.state = this.defaultState;
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  onCreateLift() {
    const { dispatch } = this.props;

    const createState = this.state.create;

    const liftData = {
      ...createState,
      is_active: true,
    };

    dispatch(createLift(liftData)).then(
      () => {
        this.dispatchGetLiftsIfCreated();
      });
  }

  /*eslint-disable*/
  onUpdateLift(liftID) {
  }
  /*esint-enable*/

  dispatchUpdateLift(liftData) {
    const { liftID, dispatch } = this.props;

    dispatch(updateLift(liftID, liftData)).then(
      () => {
        this.dispatchGetLiftsIfUpdated();
      });
  }

  dispatchGetLiftsIfCreated() {
    const { dispatch, isCreated } = this.props;

    if (isCreated) {
      dispatch(getLifts());
    }
  }

  updateCreateFieldState(fieldName, value) {
    const createState = this.state.create;

    createState[fieldName] = value;
    this.setState({ create: createState });
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
            onCreateFieldUpdated={(fieldName, value) => this.updateCreateFieldState(fieldName,value)} // eslint-disable-line
            onCreateRecord={() => this.onCreateLift()}
            onUpdateRecord={(liftID) => this.onUpdateLift(liftID)}
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
