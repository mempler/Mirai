import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, Fragment } from "react";
import Progress from "react-progress-2";
import { connect } from "react-redux";
import { Redirect } from "react-router"
import ReCAPTCHA from "reaptcha";
import { IGlobalConfigState } from "../../Actions/GlobalConfigActions";
import { LoginActiveUser } from "../../Actions/UserActions";
import { ErrorCode } from "../../API/API";
import SignUpRequest from "../../API/SignUp";
import megumin from "../../Assets/Images/Interface/Megumin.png";
import i18n from "../../Components/I18n";
import { SiteStateStore } from "../../globals";
import "./Signup.sass";

interface IState {
  UserName: string;
  Password: string;
  PasswordConfirmation: string;
  Email: string;

  ServerValidator: string
  Validated: boolean
  Failed: boolean

  Errors: string[],

  Redirect: any,
}

class SignupPage extends Component<IGlobalConfigState, IState> {
  private captchaRef: React.RefObject<ReCAPTCHA> | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      UserName: "",
      Password: "",
      PasswordConfirmation: "",
      Email: "",

      ServerValidator: "",
      Validated: false,
      Failed: false,

      Errors: [],
      Redirect: <Fragment></Fragment>,
    };
  }

  public onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    Progress.show();
    try {
      if (this.captchaRef) {
        // invalidate previous Google ReCAPTCHA Response
        this.setState({ ...this.state, Validated: false, Failed: false, ServerValidator: "" });
        (this.captchaRef as any).execute();

        while (!(this.state.Validated || this.state.Failed)) { // Wait for GReCAPTCHA Result
          await new Promise((res) => {
            return setTimeout(res, 500);
          });
          continue;
        }
      }

      /* TODO: Check Password, Valid EMail */

      try {
        const signupReq =
          new SignUpRequest(this.state.UserName, this.state.Password, this.state.Email, this.state.ServerValidator);
        await signupReq.Perform();
      } catch (errC) {
        const errCode = errC.code;
        switch (errCode) {
          case ErrorCode.Success:
            SiteStateStore.dispatch(await LoginActiveUser(this.state.UserName, this.state.Password));
            this.setState({ ...this.state, Redirect: <Redirect to="/home" /> });
        }
      }
    } finally {
      Progress.hide();
    }
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case "username":
        this.setState({ ...this.state, UserName: e.target.value });
        break;

      case "email":
        this.setState({ ...this.state, Email: e.target.value });
        break;

      case "password":
        this.setState({ ...this.state, Password: e.target.value });
        break;

      case "confirm":
        this.setState({ ...this.state, PasswordConfirmation: e.target.value });
        break;

      default:
        break;
    }
  }

  public render() {
    return (
      <div className="SignupPage">
        {this.state.Redirect}
        <div className="signupBlock">
          <h1 style={{ margin: 0, padding: 0, paddingTop: "8px", color: "#4B4C52" }}>{i18n.t("signup_prepare")}</h1>
          <h2 style={{ fontSize: "16px", color: "rgb(65, 65, 65)", fontWeight: 100 }}>
            {i18n.t("signup_description")}
          </h2>
        </div>
        <div className="signupBlock">
          <table>
            <tbody>
              <tr>
                <td className="megumin">
                  {i18n.t("signup_fun")}
                  <br />
                  <img src={megumin} height="400" alt="" />
                </td>
                <td>
                  {/* FIXME: Use another className instead of signupForm */}
                  <div className="signupForm hiddenLoading" style={{ color: "green" }}>
                    <div className="loading" style={{ position: "relative", marginBottom: "1%" }} /> {i18n.t("signup_verification_email_send")} <br /> {i18n.t("signup_dont_close")}
                  </div>
                  <form className="signupForm" onSubmit={(e) => { this.onSubmit(e); }}>
                    <div id="signupFormContents">
                      <input type="text" name="username" size={31} value={this.state.UserName} onChange={this.onChange} placeholder={i18n.t("username")} />
                      <br />
                      <input type="email" name="email" size={31} value={this.state.Email} onChange={this.onChange} placeholder={i18n.t("email")} />
                      <br />
                      <input type="password" name="password" size={31} value={this.state.Password} onChange={this.onChange} placeholder={i18n.t("password")} />
                      <br />
                      <input type="password" name="confirm" size={31} value={this.state.PasswordConfirmation} onChange={this.onChange} placeholder={i18n.t("signup_confirm")} />
                      <br />
                      <br />
                      <ReCAPTCHA
                        ref={(e) => this.captchaRef = e as any}
                        sitekey={this.props.Config.googleRecaptchaKey}
                        size="invisible"
                        onVerify={(r) => { this.setState({ ...this.state, ServerValidator: r, Validated: true, Failed: false }); }}
                        onError={() => { this.setState({ ...this.state, Failed: true }); }}
                      />
                      <input type="submit" name="submit" size={31} value={i18n.t("signup_create_account") + ""} />
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="signupBlock signupNotice">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>{i18n.t("signup_step_o")}</span>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <table style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <td style={{ width: "33%", verticalAlign: "top" }}>
                  <h3>
                    <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; &nbsp;{i18n.t("signup_step_number")} 1</h3>
                  <div style={{ color: "black", fontSize: "15px", marginTop: "10px", textShadow: "none" }}>{i18n.t("signup_step_one")}</div>
                </td>
                <td style={{ width: "33%" }}>
                  <h3>
                    <i className="fa fa-download" aria-hidden="true"></i> &nbsp; &nbsp;{i18n.t("signup_step_number")} 2
                    <br />
                  </h3>
                  <div style={{ color: "black", fontSize: "15px", marginTop: "10px", textShadow: "none" }}>{i18n.t("signup_step_two")}</div>
                </td>
                <td style={{ width: "33%" }}>
                  <h3>
                    <i className="fa fa-user" aria-hidden="true"></i> &nbsp; &nbsp;{i18n.t("signup_step_number")} 3
                    <br />
                  </h3>
                  <div style={{ color: "black", fontSize: "15px", marginTop: "10px", textShadow: "none" }}>{i18n.t("signup_step_three")}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => (state.GlobalConfigReducer),
)(SignupPage);
