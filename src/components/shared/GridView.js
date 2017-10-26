import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

export default class GridView extends Component {

  constructor(props) {
    super(props);

    const { displayFields } = this.props;

    const defaultRecord = {};
    displayFields.forEach((field) => {
      defaultRecord[field] = null;
    });

    this.defaultRecordState = defaultRecord;

    this.state = {
      updateRecord: this.defaultRecordState,
      createRecord: this.defaultRecordState,
    };
  }

  onCancelUpdate() {
    this.setState({ updateRecord: null });

    this.resetUpdateStoreState();
  }

  setUpdateView(record) {
    const nextUpdateRecord = record;

    this.setState({ updateRecord: nextUpdateRecord });

    this.resetUpdateStoreState();
  }

  getRow(record) {
    const { displayFields, onUpdateRecord, onDeleteRecord } = this.props;
    const { updateRecord } = this.state;

    if (updateRecord === null || updateRecord.id !== record.id) {
      return (
        <tr key={record.id}>
          {displayFields.map(field => (
            <td key={field.name}>{record[field.name]}</td>
          ))}
          <td>
            <button
              className="button is-info"
              onClick={() => this.setUpdateView(record)}
            >
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
            </button>
            <button
              className="button is-danger"
              onClick={() => onDeleteRecord(record)}
            >
              <span className="icon">
                <i className="fa fa-close" />
              </span>
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr key={record.id}>
        {displayFields.map(field => (
          <td key={field.name}>
            <input
              className={this.getUpdateErrorsByField(field.name) ? 'input is-danger' : 'input'}
              placeholder={field.name}
              type={field.type}
              value={updateRecord[field.name] || ''}
              onChange={event => this.setComponentState(event, field.name, 'updateRecord')}
            />
            {this.getUpdateErrorsByField(field.name) &&
              <Errors errors={this.getUpdateErrorsByField(field.name)} />
            }
          </td>
        ))}
        <td>
          <button
            className="button is-success"
            onClick={() => onUpdateRecord(updateRecord)}
          >Save Changes</button>
          <button
            className="button is-warning"
            onClick={() => this.onCancelUpdate()}
          >Cancel</button>
        </td>
      </tr>
    );
  }

  setComponentState(event, fieldName, key) {
    const currentState = this.state[key];

    const nextState = {
      ...currentState,
      [fieldName]: event.target.value,
    };

    this.setState({ [key]: nextState });
  }

  getCreationErrorsByField(fieldName) {
    const { creationErrors } = this.props;

    return creationErrors ? creationErrors[fieldName] : null;
  }

  getUpdateErrorsByField(fieldName) {
    const { updateErrors } = this.props;

    return updateErrors ? updateErrors[fieldName] : null;
  }

  resetCreateState() {
    const { onCreateReset } = this.props;

    this.setState({ createRecord: this.defaultRecordState });

    onCreateReset();
  }

  resetUpdateStoreState() {
    const { onUpdateReset } = this.props;

    onUpdateReset();
  }

  render() {
    const {
      records,
      displayFields,
      onCreateRecord,
      // errors,
      // dispatch,
    } = this.props;

    const { createRecord } = this.state;

    return (
      <div>
        <table className="table is-bordered is-striped">
          <tbody>
            <tr>
              {displayFields.map(field => (
                <th key={field.name}>{field.name}</th>
              ))}
              <td />
            </tr>
            {
              // Get row based on edit state of record
              records.map(record => this.getRow(record))
            }
            <tr>
              {displayFields.map(field => (
                <td key={field.name}>
                  <input
                    className={this.getCreationErrorsByField(field.name) ? 'input is-danger' : 'input'}
                    type={field.type}
                    value={this.state.createRecord[field.name] || ''}
                    onChange={event => this.setComponentState(event, field.name, 'createRecord')}
                    placeholder={field.name}
                  />
                  {this.getCreationErrorsByField(field.name) &&
                    <Errors errors={this.getCreationErrorsByField(field.name)} />
                  }
                </td>
              ))}
              <td>
                <button
                  className="button is-success"
                  onClick={() => onCreateRecord(createRecord)}
                >Create Lift</button>
                <button
                  className="button is-warning"
                  onClick={() => this.resetCreateState()}
                >Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

GridView.propTypes = {
  onCreateRecord: PropTypes.func.isRequired,
  onUpdateRecord: PropTypes.func.isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
  displayFields: PropTypes.array.isRequired, // eslint-disable-line
  records: PropTypes.array.isRequired, // eslint-disable-line
  updateErrors: PropTypes.object, // eslint-disable-line
  creationErrors: PropTypes.object, // eslint-disable-line
  onCreateReset: PropTypes.func.isRequired,
  onUpdateReset: PropTypes.func.isRequired,
};
