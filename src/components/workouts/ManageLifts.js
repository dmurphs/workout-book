import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LiftList from '@/components/workouts/LiftList';

export default class ManageLifts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  toggleActive() {
    const isActive = this.state.isActive;

    this.setState({
      isActive: !isActive,
    });
  }

  render() {
    const { dispatch } = this.props;
    const { isActive } = this.state;

    return (
      <div>
        {!isActive &&
          <button className="button is-info" onClick={() => this.setState({ isActive: true })}>Manage Lifts</button>
        }
        <div className={isActive ? 'modal is-active' : 'modal'}>
          <div className="modal-background" />
          <div className="modal-content">
            <LiftList dispatch={dispatch} />
          </div>
          <button onClick={() => this.toggleActive()} className="modal-close is-large" />
        </div>
      </div>
    );
  }
}

ManageLifts.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
