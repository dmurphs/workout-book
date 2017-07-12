import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSets } from '@/store/actions';

class SetList extends Component {

  componentDidMount() {
    const { dispatch, liftEntryID } = this.props;

    dispatch(getSets(liftEntryID));
  }

  render() {
    const { isFetching, received, sets } = this.props;

    const orderedSets = sets.sort((a, b) => a.set_num - b.set_num);

    return (
      <div>
        { isFetching &&
          <h1>Loading Sets</h1>
        }
        { received &&
          <ol>
            {orderedSets.map(set => (
              <li key={set.id}>
                {set.num_reps} - {set.weight}
              </li>
            ))}
          </ol>
        }
      </div>
    );
  }
}

SetList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  liftEntryID: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  received: PropTypes.bool.isRequired,
  sets: PropTypes.array, // eslint-disable-line
};

function mapStateToProps(state) {
  const { setList } = state;
  const { isFetching, received, data } = setList;

  const sets = data;

  return {
    isFetching,
    received,
    sets,
  };
}

export default connect(mapStateToProps)(SetList);
