import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SetList from '@/components/workouts/SetList';

import { updateLiftEntry, getLifts } from '@/store/actions';

class LiftEntry extends Component {

  constructor(props) {
    super(props);

    const liftID = props.liftID;
    const notes = props.notes;

    this.state = {
      updateView: false,
      liftID,
      notes,
    };

    this.handleLiftChange = this.handleLiftChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getLifts());
  }

  onUpdateLiftEntryClick() {
    const liftEntryData = this.getCurrentLiftEntryData();

    this.dispatchUpdateLiftEntry(liftEntryData);
  }

  onDeleteLiftEntryClick() {
    const currentLiftEntryData = this.getCurrentLiftEntryData();
    const liftEntryData = {
      ...currentLiftEntryData,
      is_active: false,
    };

    this.dispatchUpdateLiftEntry(liftEntryData);
  }

  onCancelUpdateClick() {
    this.setState({ updateView: false });
  }

  setUpdateView() {
    this.setState({ updateView: true });
  }

  getCurrentLiftEntryData() {
    const lift = this.state.liftID;
    const notes = this.state.notes;

    return {
      lift,
      notes,
      is_active: true,
    };
  }

  dispatchUpdateLiftEntry(liftEntryData) {
    const { liftEntryID, onUpdate, dispatch } = this.props;

    dispatch(updateLiftEntry(liftEntryID, liftEntryData)).then(
      () => {
        onUpdate();
      },
      (error) => {
        console.log(error); // eslint-disable-line
      });
  }

  handleLiftChange(event) {
    this.setState({ liftID: event.target.value });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  render() {
    const { dispatch, liftEntryID, liftID, notes, lifts } = this.props;

    const matchingLiftRecord = lifts.filter(lift => lift.id === liftID)[0];
    let liftDisplay;
    if (matchingLiftRecord) {
      liftDisplay = matchingLiftRecord.name;
    } else {
      liftDisplay = '';
    }

    return (
      <div className="card">
        { !this.state.updateView &&
          <div className="card-header">
            <h1>{ liftDisplay }-{ notes }</h1>
            <button className="button is-info" onClick={() => this.setUpdateView()}>Update</button>
            <button className="button is-danger" onClick={() => this.onDeleteLiftEntryClick()}>Delete</button>
          </div>
        }
        { this.state.updateView &&
          <div className="card-header">
            <div className="field">
              <div className="select">
                <select value={this.state.liftID} onChange={this.handleLiftChange} >
                  <option value="">Select a lift</option>
                  {lifts.map((lift) => {
                    const liftSelectionID = lift.id;
                    const liftName = lift.name;

                    return (
                      <option key={liftSelectionID} value={liftSelectionID}>{liftName}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.notes} onChange={this.handleNotesChange} placeholder="notes" />
            </div>
            <div className="field">
              <button className="button is-success" onClick={() => this.onUpdateLiftEntryClick()}>Save Changes</button>
            </div>
            <div className="field">
              <button className="button is-warning" onClick={() => this.onCancelUpdateClick()}>Cancel</button>
            </div>
          </div>
        }
        <div className="card-content">
          <SetList dispatch={dispatch} liftEntryID={liftEntryID} />
        </div>
      </div>
    );
  }
}

LiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  liftID: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  lifts: PropTypes.array.isRequired, // eslint-disable-line
  onUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { liftList } = state;
  const lifts = liftList.data;

  return {
    lifts,
  };
}

export default connect(mapStateToProps)(LiftEntry);
