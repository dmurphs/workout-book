import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';
import { getControlValue } from '@/utils';
import { getRuns } from '@/store/actions';

class CreateLiftEntry extends Component {

  constructor(props) {
    super(props);

    const { runID, notes, duration } = props;

    const distance = null;
    const elevationDelta = null;

    this.defaultState = {
      showForm: false,
      notes,
      duration,
      runID,
      distance,
      elevationDelta,
    };

    this.state = this.defaultState;

    this.handleRunChange = this.handleRunChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getRuns());
  }

  getSelectedRun() {
    const { runs } = this.props;

    const runID = this.state.runID;
    if (runID !== null && runID !== '' && !isNaN(parseInt(runID, 10))) {
      const matchingRun = runs.find(run => run.id === runID);

      return matchingRun;
    }
    return null;
  }

  getDistance() {
    const run = this.getSelectedRun();

    if (run) {
      return run.distance;
    }
    return null;
  }

  getElevationDelta() {
    const run = this.getSelectedRun();

    if (run) {
      return run.elevation_delta;
    }
    return null;
  }

  handleRunChange(event) {
    const { runs, onUpdateField } = this.props;

    const newRunID = parseInt(event.target.value, 10);

    if (!isNaN(newRunID)) {
      const matchingRun = runs.find(run => run.id === newRunID);

      this.setState({
        runID: newRunID,
        name: matchingRun.name,
        distance: matchingRun.distance,
        elevationDelta: matchingRun.elevation_delta,
      });

      onUpdateField('runID', newRunID);
    } else {
      this.setState({
        runID: null,
        name: null,
        distance: null,
        elevationDelta: null,
      });

      onUpdateField('runID', null);
    }
  }

  handleNotesChange(event) {
    const { onUpdateField } = this.props;

    const newNotesValue = event.target.value;

    this.setState({ notes: newNotesValue });

    onUpdateField('notes', newNotesValue);
  }

  handleDurationChange(event) {
    const { onUpdateField } = this.props;

    const newDurationValue = event.target.value;

    this.setState({ duration: newDurationValue });

    onUpdateField('duration', newDurationValue);
  }

  render() {
    const {
      runs,
      runIDErrors,
      notesErrors,
      durationErrors,
      nonFieldErrors,
    } = this.props;

    const runIDSelectValue = getControlValue(this.state.runID);
    const durationInputValue = getControlValue(this.state.duration);
    const notesInputValue = getControlValue(this.state.notes);

    return (
      <div>
        <div className="field">
          <div className="select">
            <select
              id="runEdit"
              value={runIDSelectValue}
              onChange={this.handleRunChange}
              className={runIDErrors ? 'input is-danger' : 'input'}
            >
              <option value="">Select a run</option>
              {runs.map((run) => {
                const runId = run.id;
                const name = run.name;

                return (
                  <option
                    key={runId}
                    value={runId}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          {runIDErrors &&
            <Errors errors={runIDErrors} />
          }
        </div>

        { (this.state.runID !== '' && this.state.runID !== null) &&
          <div>
            <h2>Selected Run Information</h2>
            <table className="table is-bordered is-striped">
              <tbody>
                <tr>
                  <td>Distance</td>
                  <td>{this.getDistance()} miles</td>
                </tr>
                <tr>
                  <td>Elevation Delta</td>
                  <td>{this.getElevationDelta()} ft</td>
                </tr>
              </tbody>
            </table>
          </div>
        }

        <hr />

        <div className="field">
          <input
            className={durationErrors ? 'input is-danger' : 'input'}
            type="text"
            value={durationInputValue}
            onChange={this.handleDurationChange}
            placeholder="duration (hh:mm:ss)"
          />
          {durationErrors &&
            <Errors errors={durationErrors} />
          }
        </div>

        <div className="field">
          <textarea
            className={notesErrors ? 'input is-danger' : 'input'}
            type="text"
            value={notesInputValue}
            onChange={this.handleNotesChange}
            placeholder="notes"
          />
          {notesErrors &&
            <Errors errors={notesErrors} />
          }
        </div>
        {nonFieldErrors &&
          <Errors errors={nonFieldErrors} />
        }
      </div>
    );
  }
}

CreateLiftEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  runID: PropTypes.number, // eslint-disable-line
  notes: PropTypes.string, // eslint-disable-line
  duration: PropTypes.string, // eslint-disable-line
  runIDErrors: PropTypes.array, // eslint-disable-line
  notesErrors: PropTypes.array, // eslint-disable-line
  distanceErrors: PropTypes.array, // eslint-disable-line
  durationErrors: PropTypes.array, // eslint-disable-line
  elevationDeltaErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
  runs: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { runList } = state;

  const runs = runList.data;

  return {
    runs,
  };
}

export default connect(mapStateToProps)(CreateLiftEntry);
