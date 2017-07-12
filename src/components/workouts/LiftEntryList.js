import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SetList from '@/components/workouts/SetList';
import CreateLiftEntry from '@/components/workouts/CreateLiftEntry';

import { getLiftEntries } from '@/store/actions';

export default class LiftEntryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liftEntries: [],
    };
  }

  componentWillMount() {
    this.updateComponentData();
  }

  updateComponentData() {
    const { dispatch, workoutID } = this.props;

    dispatch(getLiftEntries(workoutID)).then(
      (success) => {
        this.setState({ liftEntries: success.response });
      });
  }

  render() {
    const { dispatch, workoutID } = this.props;

    const liftEntries = this.state.liftEntries;

    return (
      <div>
        <ul>
          {liftEntries.map(liftEntry => (
            <li key={liftEntry.id}>
              {liftEntry.lift} - {liftEntry.notes}
              <SetList dispatch={dispatch} liftEntryID={liftEntry.id} />
            </li>
          ))}
        </ul>
        <CreateLiftEntry
          workoutID={workoutID}
          dispatch={dispatch}
          onLiftCreated={() => this.updateComponentData()}
        />
      </div>
    );
  }
}

LiftEntryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workoutID: PropTypes.string.isRequired,
};
