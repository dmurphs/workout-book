import React, { Component } from 'react';

/*eslint-disable*/
export default class Errors extends Component {
  render() {

    const { errorList } = this.props;

    return (
      <div className="notification is-danger">
        <ul>
          {Object.keys(errorList).map(errorKey => (
            <li key={errorKey}>{errorKey} - {errorList[errorKey]}</li>
          ))}
        </ul>
      </div>
    );
  }
}
/*eslint-enable*/
