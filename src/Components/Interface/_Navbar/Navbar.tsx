import { faCaretRight, faEnvelope, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserState } from "../../../Actions/UserActions";
import logo from "../../../Assets/Images/Interface/logo.png";
import I18n from "../../I18n";
import Avatar from "./Avatar";
import "./Navbar.sass";
import Profile from "./Profile";

class Navbar extends Component<IUserState> {
  public render() {
    return (
      <div className="navbar">
        <div id="navbar">
          <div id="navContents">
            <Link to="/home" id="logo">
              <span style={{ display: "inline-block", fontSize: "50px", position: "absolute" }}>
                <img src={logo} height="60" alt="" />
              </span>
            </Link>
            <form method="get" action="https://gigamons.de/" id="searchbox">
              <input type="text" name="q" size={31} value="" autoComplete="off" placeholder={I18n.t("search")} />
            </form>
            <div id="leftNav">
              <div id="leftnavlinks">
                <span className="navlink help">
                  <Link to="/help">{I18n.t("help")}
                    &nbsp;<FontAwesomeIcon className="navCaretMargin" icon={faCaretRight} />
                  </Link>
                </span>
                <span className="navlink leaderboard">
                  <Link to="/leaderboard">{I18n.t("leaderboard")}
                    &nbsp;<FontAwesomeIcon className="navCaretMargin" icon={faCaretRight} />
                  </Link>
                </span>
                <span className="navlink beatmaps">
                  <Link to="/beatmaps">{I18n.t("beatmaps")}
                    &nbsp;<FontAwesomeIcon className="navCaretMargin" icon={faCaretRight} />
                  </Link>
                </span>
              </div>
            </div>
            <div id="rightNav">
              <FontAwesomeIcon className="searchIcon" icon={faSearch} />
              <FontAwesomeIcon className="menuBars" icon={faBars} />
              <div id="rightnavlinks">
                <Profile />
              </div>
              <Avatar />
            </div>
          </div>
          <div id="advanced">
            <div id="advancedNested">
              <Link to="switcher.exe"><div className="download">{I18n.t("dl_switcher")}</div></Link>
              <div className="rightSide">
                {this.props.IsLoggedIn ?
                  <span className="right">{/* TODO: Make this do stuff */}
                    <FontAwesomeIcon icon={faEnvelope} /> {0} {I18n.t("messages")}
                  </span> :
                  <div />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    User: state.UserReducer.User,
    IsLoggedIn: state.UserReducer.IsLoggedIn,
  }),
)(Navbar);
