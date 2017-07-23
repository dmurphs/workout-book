import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { updateLift, updateLiftReset, getLifts } from '@/store/actions';

class Lift extends Component {

  constructor(props) {
    super(props);

    const name = props.name;
    const description = props.description;

    this.defaultState = {
      updateView: false,
      name,
      description,
    };

    this.state = this.defaultState;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  onUpdateLiftEntryClick() {
    const liftData = this.getCurrentLiftData();

    this.dispatchUpdateLift(liftData);
  }

  onDeleteLiftClick() {
    const currentLiftData = this.getCurrentLiftData();
    const liftData = {
      ...currentLiftData,
      is_active: false,
    };

    this.dispatchUpdateLift(liftData);
  }

  onCancelUpdateClick() {
    const { dispatch } = this.props;

    dispatch(updateLiftReset());

    this.setState(this.defaultState);
  }

  setUpdateView() {
    this.setState({ updateView: true });
  }

  getCurrentLiftData() {
    const name = this.state.name;
    const description = this.state.description;

    return {
      name,
      description,
      is_active: true,
    };
  }

  dispatchGetLiftsIfUpdated() {
    const { dispatch, isUpdated } = this.props;

    if (isUpdated) {
      dispatch(getLifts());
    }
  }

  dispatchUpdateLift(liftData) {
    const { liftID, dispatch } = this.props;

    dispatch(updateLift(liftID, liftData)).then(
      () => {
        this.dispatchGetLiftsIfUpdated();
      });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const {
      name,
      description,
      nameErrors,
      descriptionErrors,
      nonFieldErrors,
    } = this.props;

    const updateView = this.state.updateView;

    const descriptionText = description ? description : '(No Description)'; // eslint-disable-line

    return (
      <div>
        {!updateView &&
          <div className="columns">
            <div className="column">
              {name}
            </div>
            <div className="column">
              {descriptionText}
            </div>
            <div className="column">
              <button className="button is-info" onClick={() => this.setUpdateView()}>Update</button>
            </div>
            <div className="column">
              <button className="button is-danger" onClick={() => this.onDeleteLiftClick()}>Delete</button>
            </div>
          </div>
        }
        {updateView &&
          <div>
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
              <button className="button is-success" onClick={() => this.onUpdateLiftEntryClick()}>Update Lift</button>
              <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

Lift.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string, // eslint-disable-line
  isUpdated: PropTypes.bool.isRequired,
  nameErrors: PropTypes.array, // eslint-disable-line
  descriptionErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { liftUpdate } = state;

  const { isUpdated, errors } = liftUpdate;

  const nameErrors = errors ? errors.name : null;
  const descriptionErrors = errors ? errors.description : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isUpdated,
    nameErrors,
    descriptionErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(Lift);
