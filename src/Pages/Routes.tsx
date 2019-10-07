import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Leaderboard from "./Leaderboard/Leaderboard";
import Signup from "./Signup/Signup";
import User from "./User/User";

export default class Routes extends Component {
    public render() {
        return (
            <div>
                <Route path="/home" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/u/:id" component={User} />
                <Route path="/leaderboard" component={Leaderboard} />
            </div>
        );
    }
}
