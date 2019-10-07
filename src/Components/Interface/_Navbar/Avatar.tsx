import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserState } from "../../../Actions/UserActions";
import { AVATAR_ENDPOINT } from "../../../globals";
import "./Avatar.sass";

class Avatar extends Component<any, IUserState> {
    public render() {
        if (this.props.IsLoggedIn) {
            return (
                <div id="navAvatar">
                    <Link to={"/u/" + this.props.User.id}><img src={AVATAR_ENDPOINT + "/" + this.props.User.id} alt="Your user profile." /></Link>
                </div>
            );
        }

        return (
            <div id="navAvatar">
                <img src={AVATAR_ENDPOINT + "/0"} width="56" height="56" alt="Default osu profile." />
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        User: state.UserReducer.User,
        IsLoggedIn: state.UserReducer.IsLoggedIn,
    }),
)(Avatar);
