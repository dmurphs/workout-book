import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateWorkout from '@/components/workouts/CreateWorkout';
import { createWorkout } from '@/store/actions';

/*eslint-disable*/
export default class Dashboard extends Component{

  render(){
    const { dispatch, isAuthenticated } = this.props;

    return(
      <div>
        <CreateWorkout 
          isAuthenticated={isAuthenticated} 
          onCreateClick={workoutData => dispatch(createWorkout(workoutData))} />
      </div>
    );
  }
}
/*eslint-enable*/

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
