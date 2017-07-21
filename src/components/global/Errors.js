import React, { Component } from 'react';

/*eslint-disable*/
export default class Errors extends Component {
  render() {

    const { errors } = this.props;

    return (
      <div className="notification is-danger">
        <ul>
          {Object.keys(errors).map(errorKey => (
            <li key={errorKey}>{errorKey} - {errors[errorKey]}</li>
          ))}
        </ul>
      </div>
    );
  }
}
/*eslint-enable*/
