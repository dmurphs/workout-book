// CreateRunEntry.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { createSet, createSetReset, getSets } from '@/store/actions';

class CreateSet extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      showForm: false,
      numReps: '',
      weight: '',
    };

    this.state = this.defaultState;

    this.handleNumRepsChange = this.handleNumRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
  }

  dispatchGetSetsIfCreated() {
    const { dispatch, isCreated, liftEntryID } = this.props;

    if (isCreated) {
      dispatch(getSets(liftEntryID));
    }
  }

  handleSetCreationClick() {
    const { dispatch, liftEntryID } = this.props;

    const setData = {
      num_reps: this.state.numReps,
      weight: this.state.weight,
      is_active: true,
    };

    dispatch(createSet(liftEntryID, setData)).then(
      () => {
        this.dispatchGetSetsIfCreated();
      });
  }

  handleCancelCreationClick() {
    const { dispatch } = this.props;

    dispatch(createSetReset());

    this.setState({ showForm: false });
  }

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    const { numRepsErrors, weightErrors, nonFieldErrors } = this.props;
    const showForm = this.state.showForm;

    return (
      <div>
        { showForm &&
          <div>
            <h2>Create New Set</h2>
            <div className="field">
              <input
                className={numRepsErrors ? 'input is-danger' : 'input'}
                type="number"
                value={this.state.numReps}
                onChange={this.handleNumRepsChange}
                placeholder="number of reps"
              />
              {numRepsErrors &&
                <Errors errors={numRepsErrors} />
              }
            </div>
            <div className="field">
              <input
                className={weightErrors ? 'input is-danger' : 'input'}
                type="number"
                value={this.state.weight}
                onChange={this.handleWeightChange}
                placeholder="weight"
              />
              {weightErrors &&
                <Errors errors={weightErrors} />
              }
            </div>
            {nonFieldErrors &&
              <Errors errors={nonFieldErrors} />
            }
            <div className="field">
              <button className="button is-success" onClick={() => this.handleSetCreationClick()}>Create Set</button>
              <button className="button is-warning" onClick={() => this.handleCancelCreationClick()}>Cancel</button>
            </div>
          </div>
        }
        { !showForm &&
          <button className="button is-info" onClick={() => this.setState({ showForm: true })}>Add Set</button>
        }
      </div>
    );
  }
}

CreateSet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  isCreated: PropTypes.bool.isRequired,
  numRepsErrors: PropTypes.array, // eslint-disable-line
  weightErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array // eslint-disable-line
};

function mapStateToProps(state) {
  const { setCreation } = state;
  const { isCreated, errors } = setCreation;

  const numRepsErrors = errors ? errors.num_reps : null;
  const weightErrors = errors ? errors.weight : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isCreated,
    numRepsErrors,
    weightErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(CreateSet);
