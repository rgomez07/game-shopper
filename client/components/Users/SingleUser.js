import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../../store/singleUser';

class SingeUser extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchSingleUser(this.props.match.params.id);
    }

    render() {
        const {admin} = this.props.singleUser;
        return (
            <div>
                <h1>{this.props.singleUser.username}</h1>
                <br />
                <h2>{admin}</h2>
                {console.log(this.props.singleUser)}
            </div>
        )
    }
}

const mapState = (state) => ({ singleUser: state.singleUserReducer });

const mapDispatch = (dispatch) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
});

export default connect(mapState, mapDispatch)(SingeUser);
