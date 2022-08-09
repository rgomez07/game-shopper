import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUser } from "../../store/singleUser";
import DeleteUser from "./DeleteUser";

class SingeUser extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id);
  }

  render() {
    const { admin } = this.props.singleUser;
    return (
      <div>
        <h1>Name: {this.props.singleUser.username}</h1>
        <h3>User Type: {this.props.singleUser.userType}</h3>
        <br />
        <h2>{this.props.singleUser.email}</h2>
        {console.log(this.props.singleUser)}
        <DeleteUser user={this.props.singleUser} />
      </div>
    );
  }
}

const mapState = (state) => ({ singleUser: state.singleUserReducer });

const mapDispatch = (dispatch) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id, history)),
});

export default connect(mapState, mapDispatch)(SingeUser);
