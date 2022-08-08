import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../store/users';
import { me } from '../../store/auth';

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers(), this.props.current();
  }

  render() {
    {
      console.log('USERS PROP -->', this.props.me);
    }
    return (
      <div>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`} className='userListTextColor'>
              <br />
              {user.username}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.userListReducer,
    me: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUser()),
  current: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(AllUsers);
