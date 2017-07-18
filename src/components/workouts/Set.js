import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateSet } from '@/store/actions';

export default class Set extends Component {

  constructor(props) {
    super(props);

    const setNum = props.setNum;
    const numReps = props.numReps;
    const weight = props.weight;

    this.state = {
      updateView: false,
      setNum,
      numReps,
      weight,
    };

    this.handleSetNumChange = this.handleSetNumChange.bind(this);
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
    const setNum = this.state.setNum;
    const numReps = this.state.numReps;
    const weight = this.state.weight;

    return {
      set_num: setNum,
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

  handleSetNumChange(event) {
    this.setState({ setNum: event.target.value });
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
          <div>
            <h1>{numReps} - {weight}</h1>
            <button className="button is-info" onClick={() => this.setUpdateView()}>Update</button>
            <button className="button is-danger" onClick={() => this.onDeleteSetClick()}>Delete</button>
          </div>
        }
        { this.state.updateView &&
          <div>
            <div className="field">
              <input className="input" type="number" value={this.state.setNum} onChange={this.handleSetNumChange} placeholder="set number" />
            </div>
            <div className="field">
              <input className="input" type="number" value={this.state.numReps} onChange={this.handleNumRepsChange} placeholder="number of reps" />
            </div>
            <div className="field">
              <input className="input" type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder="weight" />
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
  setNum: PropTypes.number.isRequired,
  numReps: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
