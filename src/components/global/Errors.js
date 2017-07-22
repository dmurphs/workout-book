import React, { Component } from 'react';

/*eslint-disable*/
export default class Errors extends Component {
  render() {

    const { errors } = this.props;

    return (
      <ul className="help is-danger">
        {(errors).map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    );
  }
}
/*eslint-enable*/
