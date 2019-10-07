import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Progress from "react-progress-2";
import { UpdateActiveUser } from "../../../Actions/UserActions";
import TokenAuthRequest, { ITokenResponse } from "../../../API/OAuth";
import { cookies, SiteStateStore } from "../../../globals";
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
        Progress.show();
        const authReq = new TokenAuthRequest(this.state.Username, this.state.Password);

        const result = await authReq.Perform();

        if ((result as any).code) {
            console.error(result);
        }

        const r = result as ITokenResponse;
        const d = new Date();
        d.setSeconds(d.getSeconds() + r.expires_in);

        cookies.set("AUTH_TOKEN", r.access_token, {
            expires: d,
        });

        SiteStateStore.dispatch(await UpdateActiveUser());

        Progress.hide();
    }

    public render() {
        return (
            <div id="login">
                <div className={"dropdown" + (this.state.Expanded ? " show" : "")}>
                    <span style={{ userSelect: "none" }} onClick={this.expand}>{i18n.t("login")}</span>
                    <br /> <br />
                    <div className="dropdown-content">
                        <h1>Login</h1>
                        <form className="loginForm">
                            <input type="text" name="username" size={31} value={this.state.Username} onChange={this.handleUsernameInput} placeholder={i18n.t("username")} />
                            <input type="password" name="password" size={31} value={this.state.Password} onChange={this.handlePasswordInput} placeholder={i18n.t("password")} />

                            { /* <input type="checkbox" name="remember_me" size={31} defaultChecked={true} /> */}

                            { /* <label style={{ position: 'absolute', left: '31px', bottom: '20px', fontSize: '12px' }} htmlFor="remember_me">{i18n.t('login_remember_me')}</label> */}
                            <input type="button" name="submit" size={31} onClickCapture={this.beginSubmit} defaultValue={i18n.t("login") + ""} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Login);
