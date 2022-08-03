

import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchUser } from '../../store/users';

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();

  }

  render() {
    {console.log(this.props.users)}
    
      return (
        <div>
          {this.props.users.map(user => (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
              <br/>
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
  };
};

const mapDispatch = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUser())
  });

export default connect(mapState, mapDispatch)(AllUsers);