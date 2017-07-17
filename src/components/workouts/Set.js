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
    const { setID, onUpdate, dispatch } = this.props;

    const setNum = this.state.setNum;
    const numReps = this.state.numReps;
    const weight = this.state.weight;

    const setData = {
      set_num: setNum,
      num_reps: numReps,
      weight,
    };

    dispatch(updateSet(setID, setData)).then(
      () => {
        onUpdate();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  onCancelUpdateClick() {
    this.setState({ updateView: false });
  }

  setUpdateView() {
    this.setState({ updateView: true });
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
            <button onClick={() => this.setUpdateView()}>Update</button>
          </div>
        }
        { this.state.updateView &&
          <div>
            <input type="number" value={this.state.setNum} onChange={this.handleSetNumChange} placeholder="set number" />
            <input type="number" value={this.state.numReps} onChange={this.handleNumRepsChange} placeholder="number of reps" />
            <input type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder="weight" />
            <button onClick={() => this.onUpdateSetClick()}>Save Changes</button>
            <button onClick={() => this.onCancelUpdateClick()}>Cancel</button>
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
