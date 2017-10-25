import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

export default class GridView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updateRecord: null,
      createRecord: null,
    };
  }

  onCancelUpdate() {
    this.setState({ updateRecord: null });
  }

  setUpdateView(record) {
    const nextUpdateRecord = record;

    this.setState({ updateRecord: nextUpdateRecord });
  }

  getRow(record) {
    const { displayFields, onUpdateRecord } = this.props;
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
            >Update</button>
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
              value={updateRecord[field.name]}
              onChange={event => this.setUpdatedState(event, field.name)}
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

  setCreateState(event, fieldName) {
    const { createRecord } = this.state;

    const nextCreateState = {
      ...createRecord,
      [fieldName]: event.target.value,
    };

    this.setState({ createRecord: nextCreateState });
  }

  setUpdatedState(event, fieldName) {
    const { updateRecord } = this.state;

    const nextUpdateRecord = {
      ...updateRecord,
      [fieldName]: event.target.value,
    };

    this.setState({ updateRecord: nextUpdateRecord });
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
                  onClick={() => onCreateRecord(createRecord)}
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
