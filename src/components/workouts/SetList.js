import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getSets } from '@/store/actions';

export default class SetList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sets: [],
    };
  }

  componentWillMount() {
    const { dispatch, liftEntryID } = this.props;

    dispatch(getSets(liftEntryID)).then(
      (success) => {
        this.setState({ sets: success.response });
      });
  }

  render() {
    const sets = this.state.sets;

    const orderedSets = sets.sort((a, b) => a.set_num - b.set_num);

    return (
      <div>
        <ol>
          {orderedSets.map(set => (
            <li key={set.id}>
              {set.num_reps} - {set.weight}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

SetList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
};
