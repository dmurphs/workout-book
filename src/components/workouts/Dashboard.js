import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*eslint-disable*/
export default class Dashboard extends Component{

  render(){
    const { isAuthenticated } = this.props;

    return(
      <div>
        <Link to="/create_workout">Create New Workout</Link>
      </div>
    );
  }
}
/*eslint-enable*/

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
