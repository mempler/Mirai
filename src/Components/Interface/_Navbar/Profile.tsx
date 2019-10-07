import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserState, LogoutActiveUser } from "../../../Actions/UserActions";
import { SiteStateStore } from "../../../globals";
import { GetLevelByTotalScore } from "../../../Utils/LevelUtility";
import i18n from "../../I18n";
import Login from "./Login";
import "./Profile.sass";

class Profile extends Component<IUserState> {
    public render() {
        console.log(this.props);
        if (this.props.IsLoggedIn) {
            return (
                <div id="profile">
                    <div id="username">
                        <Link to={"/u/" + this.props.User.id}>
                            <span style={{ fontSize: "18px" }}>{this.props.User.userName}</span>
                        </Link>
                    </div>
                    <div id="sessionControls">
                        <Link to="#" onClick={() => { SiteStateStore.dispatch(LogoutActiveUser()); }}>
                            {i18n.t("logout")}</Link> &bull; <Link to="/settings">{i18n.t("settings")}
                        </Link>
                    </div>
                    <div id="stats">
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>#{this.props.User.globalRank}</span>
                        <br />
                        {Math.round(this.props.User.performance)}PP<br />
                        {Math.round(this.props.User.accuracy * 10000) / 100}% Accuracy<br />
                        Level {GetLevelByTotalScore(this.props.User.totalScore)}
                    </div>
                </div>
            );
        } else {
            return (
                <div id="profile">
                    <div id="welcome">
                        <span style={{ fontSize: "15px" }}>{i18n.t("welcome_guest")}</span> <br />
                        <span><Login /> &bull; <Link to="/signup" >{i18n.t("signup")}</Link></span>
                    </div>
                    { /* TODO: add design here */}
                    <div id="login" />
                </div>
            );
        }
    }
}

export default connect(
    (state: any) => ({
        User: state.UserReducer.User,
        IsLoggedIn: state.UserReducer.IsLoggedIn,
    }),
)(Profile);
