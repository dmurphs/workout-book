// CreateRunEntry.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { createSet, getSets } from '@/store/actions';

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
    this.setState({ showForm: false });
  }

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    const { errors } = this.props;
    const showForm = this.state.showForm;

    return (
      <div>
        { showForm &&
          <div>
            <h2>Create New Set</h2>
            <div className="field">
              <input className="input" type="number" value={this.state.numReps} onChange={this.handleNumRepsChange} placeholder="number of reps" />
            </div>
            <div className="field">
              <input className="input" type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder="weight" />
            </div>
            { errors &&
              <Errors errorList={errors} />
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
  errors: PropTypes.object, // eslint-disable-line
};

function mapStateToProps(state) {
  const { setCreation } = state;
  const { isCreated, errors } = setCreation;

  return {
    isCreated,
    errors,
  };
}

export default connect(mapStateToProps)(CreateSet);
