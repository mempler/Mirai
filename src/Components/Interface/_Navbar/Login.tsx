import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { LoginActiveUser } from "../../../Actions/UserActions";
import { SiteStateStore } from "../../../globals";
import i18n from "../../I18n";
import "./Login.sass";

declare interface IState {
    Expanded: boolean;
    Username: string;
    Password: string;
}

export class Login extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Expanded: false,
            Username: "",
            Password: "",
        };
    }

    public expand = () => {
        this.setState({ Expanded: true });
    }

    public collapse = () => {
        this.setState({ Expanded: false });
    }

    public handleClickOutside = () => {
        this.collapse();
    }

    public handleUsernameInput = (e: any) => {
        this.setState({ Username: e.target.value });
    }

    public handlePasswordInput = (e: any) => {
        this.setState({ Password: e.target.value });
    }

    public beginSubmit = async (event: any) => {
        event.preventDefault();

        SiteStateStore.dispatch(await LoginActiveUser(this.state.Username, this.state.Password));
    }

    public render() {
        return (
            <div id="login">
                <div className={"dropdown" + (this.state.Expanded ? " show" : "")}>
                    <span style={{ userSelect: "none" }} onClick={this.expand}>{i18n.t("login")}</span>
                    <br /> <br />
                    <div className="dropdown-content">
                        <h1>Login</h1>
                        <form className="loginForm" onSubmit={this.beginSubmit}>
                            <input type="text" name="username" size={31} value={this.state.Username} onChange={this.handleUsernameInput} placeholder={i18n.t("username")} />
                            <input type="password" name="password" size={31} value={this.state.Password} onChange={this.handlePasswordInput} placeholder={i18n.t("password")} />
                            <input type="submit" name="submit" size={31} defaultValue={i18n.t("login") + ""} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Login);
