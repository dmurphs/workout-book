import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateSet } from '@/store/actions';

export default class Set extends Component {

  constructor(props) {
    super(props);

    const numReps = props.numReps;
    const weight = props.weight;

    this.state = {
      updateView: false,
      numReps,
      weight,
    };

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

  dispatchUpdateSet(setData) {
    const { setID, onUpdate, dispatch } = this.props;

    dispatch(updateSet(setID, setData)).then(
      () => {
        onUpdate();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  handleNumRepsChange(event) {
    this.setState({ numReps: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    const { numReps, weight } = this.props;

    return (
      <div>
        { !this.state.updateView &&
          <div className="columns">
            <div className="column is-8">
              <h1>{numReps} reps - {weight} lbs</h1>
            </div>
            <div className="column is-4">
              <button className="button is-info" onClick={() => this.setUpdateView()}>Update</button>
              <button className="button is-danger" onClick={() => this.onDeleteSetClick()}>Delete</button>
            </div>
          </div>
        }
        { this.state.updateView &&
          <div>
            <div className="field">
              <label className="label" htmlFor="editNumReps">Num Reps</label>
              <div className="control">
                <input
                  id="editNumReps"
                  className="input"
                  type="number"
                  value={this.state.numReps}
                  onChange={this.handleNumRepsChange}
                  placeholder="number of reps"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="editWeight">Weight</label>
              <div className="control">
                <input
                  id="editWeight"
                  className="input"
                  type="number"
                  value={this.state.weight}
                  onChange={this.handleWeightChange}
                  placeholder="weight"
                />
              </div>
            </div>
            <div className="field">
              <button className="button is-success" onClick={() => this.onUpdateSetClick()}>Save Changes</button>
            </div>
            <div className="field">
              <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

Set.propTypes = {
  setID: PropTypes.number.isRequired,
  numReps: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
