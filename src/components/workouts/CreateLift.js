import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { createLift, createLiftReset, getLifts } from '@/store/actions';

class CreateLift extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      showForm: false,
      name: '',
      description: '',
    };

    this.state = this.defaultState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  dispatchGetLiftsIfCreated() {
    const { dispatch, isCreated } = this.props;

    if (isCreated) {
      dispatch(getLifts());
    }
  }

  handleCancelLiftCreateClick() {
    const { dispatch } = this.props;

    dispatch(createLiftReset());

    this.setState({ showForm: false });
  }

  handleLiftCreateClick() {
    const { dispatch } = this.props;

    const liftData = {
      name: this.state.name,
      description: this.state.description,
      is_active: true,
    };

    dispatch(createLift(liftData)).then(
      () => {
        this.dispatchGetLiftsIfCreated();
      });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const { nameErrors, descriptionErrors, nonFieldErrors } = this.props;
    const { showForm } = this.state;

    return (
      <div>
        { showForm &&
        <div>
          <h2>Create New Lift</h2>
          <div className="field">
            <input className={nameErrors ? 'input is-danger' : 'input'} type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="name" />
            {nameErrors &&
              <Errors errors={nameErrors} />
            }
          </div>
          <div className="field">
            <input className={descriptionErrors ? 'input is-danger' : 'input'} type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="description" />
            {descriptionErrors &&
              <Errors errors={descriptionErrors} />
            }
          </div>
          {nonFieldErrors &&
            <Errors errors={nonFieldErrors} />
          }
          <div className="field">
            <button className="button is-success" onClick={() => this.handleLiftCreateClick()}>Create Lift</button>
            <button className="button is-warning" onClick={() => this.handleCancelLiftCreateClick()}>Cancel</button>
          </div>
        </div>
        }
        { !showForm &&
          <button className="button is-info" onClick={() => this.setState({ showForm: true })}>New Lift</button>
        }
      </div>
    );
  }
}

CreateLift.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isCreated: PropTypes.bool.isRequired,
  nameErrors: PropTypes.array, // eslint-disable-line
  descriptionErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftCreation } = state;

  const { isCreated, errors } = liftCreation;

  const nameErrors = errors ? errors.name : null;
  const descriptionErrors = errors ? errors.description : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isCreated,
    nameErrors,
    descriptionErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(CreateLift);
