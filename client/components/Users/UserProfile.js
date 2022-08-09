import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUser, updateUser } from "../../store/singleUser";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id);
    this.setState({ ...this.props.singleUser });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({ ...this.props.singleUser, ...this.state });
  }

  render() {
    const { username, email } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form id="edit-user-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="string"
          name="username"
          onChange={handleChange}
          value={username}
        />
        <br />
        <br />
        <label htmlFor="email">Email:</label>
        <textarea name="email" onChange={handleChange} value={email} />
        <br />
        <br />

        <button type="submit">Update Profile</button>
        <br />
        <br />
        <Link to="/home">Cancel</Link>
      </form>
    );
  }
}

const mapState = (state) => ({
  singleUser: state.singleUserReducer,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
  updateUser: (user) => dispatch(updateUser(user, history)),
});

export default connect(mapState, mapDispatch)(UserProfile);
