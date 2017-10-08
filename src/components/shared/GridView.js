import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Errors from '@/components/global/Errors';
// import { getControlValue } from '@/utils';

export default class GridView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updateIDs: [],
    };
  }

  setUpdateView(recordID) {
    const updateIDs = this.state.updateIDs;

    updateIDs.push(recordID);

    this.setState({ updateIDs });
  }

  getRow(record) {
    const { displayFields } = this.props;

    const isUpdate = this.state.updateIDs.includes(record.id);

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

    return (<h1>Update...</h1>);
  }

  updateCreateState(event, fieldName) {
    const { onCreateFieldUpdated } = this.props;

    onCreateFieldUpdated(fieldName, event.target.value);
  }

  render() {
    const {
      records,
      displayFields,
      onCreateRecord,
      // onUpdateRecord,
      // errors,
      // dispatch,
    } = this.props;

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
            {records.map(record => this.getRow(record))}
            <tr>
              {displayFields.map(field => (
                <td key={field.name}>
                  <input
                    className="input"
                    type={field.type}
                    onChange={event => this.updateCreateState(event, field.name)}
                    placeholder={field.name}
                  />
                </td>
              ))}
              <td>
                <button
                  className="button is-success"
                  onClick={() => onCreateRecord()}
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
  // dispatch: PropTypes.func.isRequired,
  onCreateFieldUpdated: PropTypes.func.isRequired,
  onCreateRecord: PropTypes.func.isRequired,
  // onUpdateRecord: PropTypes.func.isRequired,
  displayFields: PropTypes.array.isRequired, // eslint-disable-line
  records: PropTypes.array.isRequired, // eslint-disable-line
  // errors: PropTypes.object.isRequired, // eslint-disable-line
};
