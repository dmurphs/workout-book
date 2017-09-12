import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { updateSet, updateSetReset, getSets } from '@/store/actions';

class SetRow extends Component {

  constructor(props) {
    super(props);

    const numReps = props.numReps;
    const weight = props.weight;

    this.defaultState = {
      updateView: false,
      numReps,
      weight,
    };

    this.state = this.defaultState;

    this.handleNumRepsChange = this.handleNumRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
  }

  onUpdateSetClick() {
    const setData = this.getCurrentSetData();

    this.dispatchUpdateSet(setData);
  }

  onDeleteSetClick() {
    const currentSetData = this.getCurrentSetData();

    // We don't actually delete, just deactivate the record
    const setData = {
      ...currentSetData,
      is_active: false,
    };

    this.dispatchUpdateSet(setData);
  }

  onCancelUpdateClick() {
    const { dispatch } = this.props;

    dispatch(updateSetReset());
    this.setState(this.defaultState);

    this.setState({ updateView: false });
  }

  getCurrentSetData() {
    const numReps = this.state.numReps;
    const weight = this.state.weight;

    return {
      num_reps: numReps,
      weight,
      is_active: true,
    };
  }

  setUpdateView() {
    this.setState({ updateView: true });
  }

  dispatchGetSetsIfUpdated() {
    const { isUpdated, dispatch, liftEntryID } = this.props;

    if (isUpdated) {
      dispatch(getSets(liftEntryID));
    }
  }

  dispatchUpdateSet(setData) {
    const { setID, dispatch } = this.props;

    dispatch(updateSet(setID, setData)).then(
      () => {
        this.dispatchGetSetsIfUpdated();
      });
  }

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    const { numReps, weight, numRepsErrors, weightErrors, nonFieldErrors } = this.props;

    if (!this.state.updateView) {
      return (
        <tr onDoubleClick={() => this.setUpdateView()}>
          <td>{numReps}</td>
          <td>{weight}</td>
          <td>
            <button className="button is-info" onClick={() => this.setUpdateView()}>
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
            </button>
            <button className="button is-danger" onClick={() => this.onDeleteSetClick()}>
              <span className="icon">
                <i className="fa fa-close" />
              </span>
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>
          <div className="control">
            <input
              id="editNumReps"
              className={numRepsErrors ? 'input is-danger' : 'input'}
              type="number"
              value={this.state.numReps}
              onChange={this.handleNumRepsChange}
              placeholder="number of reps"
            />
            { numRepsErrors &&
              <Errors errors={numRepsErrors} />
            }
          </div>
        </td>
        <td>
          <div className="control">
            <input
              id="editWeight"
              className={weightErrors ? 'input is-danger' : 'input'}
              type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              placeholder="weight (lbs)"
            />
            { weightErrors &&
              <Errors errors={weightErrors} />
            }
          </div>
        </td>
        { nonFieldErrors &&
          <Errors errors={nonFieldErrors} />
        }
        <td>
          <button className="button is-success" onClick={() => this.onUpdateSetClick()}>Save Changes</button>
          <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
        </td>
      </tr>
    );
  }
}

SetRow.propTypes = {
  setID: PropTypes.number.isRequired,
  numReps: PropTypes.number.isRequired,
  weight: PropTypes.number, // eslint-disable-line
  liftEntryID: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  numRepsErrors: PropTypes.array, // eslint-disable-line
  weightErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array // eslint-disable-line
};

function mapStateToProps(state) {
  const { setUpdate } = state;
  const { isUpdated, errors } = setUpdate;

  const numRepsErrors = errors ? errors.num_reps : null;
  const weightErrors = errors ? errors.weight : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isUpdated,
    numRepsErrors,
    weightErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(SetRow);
