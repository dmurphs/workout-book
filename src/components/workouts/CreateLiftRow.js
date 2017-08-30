import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { createLift, getLifts } from '@/store/actions';

class CreateLiftRow extends Component {

  constructor(props) {
    super(props);
    this.defaultState = {
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
    this.setState(this.defaultState);
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

    return (
      <tr>
        <td>
          <input className={nameErrors ? 'input is-danger' : 'input'} type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="name" />
          {nameErrors &&
            <Errors errors={nameErrors} />
          }
        </td>
        <td>
          <input className={descriptionErrors ? 'input is-danger' : 'input'} type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="description" />
          {descriptionErrors &&
            <Errors errors={descriptionErrors} />
          }
        </td>
        {nonFieldErrors &&
          <Errors errors={nonFieldErrors} />
        }
        <td>
          <button className="button is-success" onClick={() => this.handleLiftCreateClick()}>Create Lift</button>
          <button className="button is-warning" onClick={() => this.handleCancelLiftCreateClick()}>Cancel</button>
        </td>
      </tr>
    );
  }
}

CreateLiftRow.propTypes = {
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

export default connect(mapStateToProps)(CreateLiftRow);
