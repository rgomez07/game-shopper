import React from "react";
import { connect } from "react-redux";
import { toDeleteUser } from '../../store/users';

const DeleteUser = (props) => {

  const {id} = props.user

    return (
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            type="button"
            className="remove"
            onClick={() => props.deleteUser(id)}
          >
            Delete
          </button>
        </form>
    );
  }

const mapDispatchToProps = (dispatch,{history}) => {
  return {
    deleteUser: (id) => dispatch(toDeleteUser(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteUser);
