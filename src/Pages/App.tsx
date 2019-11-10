import React, { Component } from "react";
import Progress from "react-progress-2";
import "react-progress-2/main.css";
import { withRouter } from "react-router-dom";
import { UpdateConfig } from "../Actions/GlobalConfigActions";
import { UpdateActiveUser } from "../Actions/UserActions";
import Navbar from "../Components/Interface/_Navbar/Navbar";
import Footbar from "../Components/Interface/Footbar/Footbar";
import { SiteStateStore } from "../globals";
import Routes from "./Routes";

class App extends Component {
  public componentDidMount() {
    if (localStorage.getItem("AUTH_TOKEN")) {
      UpdateActiveUser().then(SiteStateStore.dispatch);
    }
    UpdateConfig().then(SiteStateStore.dispatch);
  }

  public componentDidUpdate() {
    Progress.show();
    Progress.hide();
  }

  public render() {
    return (
      <div className="App">
        <Navbar />
        <div id="container">
          <div id="content" style={{ textAlign: "center" }}>
            <Routes />
          </div>
        </div>
        <Footbar />
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);
