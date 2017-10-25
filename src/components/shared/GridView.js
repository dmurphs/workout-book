import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

export default class GridView extends Component {

  constructor(props) {
    super(props);

    const { records } = this.props;

    this.state = {
      editingIDs: [],
      recordUpdates: records,
      create: {},
    };
  }

  onCancelUpdate(recordID) {
    const { recordUpdates, editingIDs } = this.state;
    const { records } = this.props;

    const originalRecord = records
      .find(record => record.id === recordID);

    const nextRecordUpdates = recordUpdates.map((record) => {
      if (record.id !== recordID) {
        return record;
      }

      return originalRecord;
    });

    const nextEditingIDs = editingIDs
      .filter(id => id !== recordID);

    this.setState({
      editingIDs: nextEditingIDs,
      recordUpdates: nextRecordUpdates,
    });
  }

  setUpdateView(recordID) {
    const { editingIDs } = this.state;

    editingIDs.push(recordID);

    this.setState({ editingIDs });
  }

  getRow(record) {
    const { displayFields, onUpdateRecord } = this.props;
    const { editingIDs } = this.state;

    const isUpdate = editingIDs.includes(record.id);

    if (!isUpdate) {
      return (
        <tr key={record.id}>
          {displayFields.map(field => (
            <td key={field.name}>{record[field.name]}</td>
          ))}
          <td>
            <button
              className="button is-info"
              onClick={() => this.setUpdateView(record.id)}
            >Update</button>
          </td>
        </tr>
      );
    }

    const { recordUpdates } = this.state;
    const matchingUpdateRecord = recordUpdates
      .find(recordUpdate => recordUpdate.id === record.id);

    return (
      <tr key={record.id}>
        {displayFields.map(field => (
          <td key={field.name}>
            <input
              className={this.getUpdateErrorsByField(field.name) ? 'input is-danger' : 'input'}
              placeholder={field.name}
              type={field.type}
              value={matchingUpdateRecord[field.name]}
              onChange={event => this.setUpdatedState(event, field.name, record.id)}
            />
            {this.getUpdateErrorsByField(field.name) &&
              <Errors errors={this.getUpdateErrorsByField(field.name)} />
            }
          </td>
        ))}
        <td>
          <button
            className="button is-info"
            onClick={() => onUpdateRecord(matchingUpdateRecord)}
          >Save Changes</button>
          <button
            className="button is-warning"
            onClick={() => this.onCancelUpdate(record.id)}
          >Cancel</button>
        </td>
      </tr>
    );
  }

  setCreateState(event, fieldName) {
    const { create } = this.state;

    const nextCreateState = {
      ...create,
      [fieldName]: event.target.value,
    };

    this.setState({ create: nextCreateState });
  }

  setUpdatedState(event, fieldName, recordID) {
    const { recordUpdates } = this.state;

    const nextRecordUpdates = recordUpdates.map((record) => {
      if (record.id !== recordID) {
        return record;
      }

      return {
        ...record,
        [fieldName]: event.target.value,
      };
    });

    this.setState({ recordUpdates: nextRecordUpdates });
  }

  getCreationErrorsByField(fieldName) {
    const { creationErrors } = this.props;

    return creationErrors ? creationErrors[fieldName] : null;
  }

  getUpdateErrorsByField(fieldName) {
    const { updateErrors } = this.props;

    return updateErrors ? updateErrors[fieldName] : null;
  }

  render() {
    const {
      records,
      displayFields,
      onCreateRecord,
      // errors,
      // dispatch,
    } = this.props;

    const { create } = this.state;

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
                    onChange={event => this.setCreateState(event, field.name)}
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
                  onClick={() => onCreateRecord(create)}
                >Create Lift</button>
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
  displayFields: PropTypes.array.isRequired, // eslint-disable-line
  records: PropTypes.array.isRequired, // eslint-disable-line
  updateErrors: PropTypes.object, // eslint-disable-line
  creationErrors: PropTypes.object, // eslint-disable-line
};
