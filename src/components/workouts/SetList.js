import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSets } from '@/store/actions';

class SetList extends Component {

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
    const { isFetching, received } = this.props;

    const sets = this.state.sets;

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
};

function mapStateToProps(state) {
  const { setList } = state;
  const { isFetching, received } = setList;

  return {
    isFetching,
    received,
  };
}

export default connect(mapStateToProps)(SetList);
