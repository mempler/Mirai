import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import Progress from "react-progress-2";
import { Link } from "react-router-dom";
import LatestDonatorsRequest, { ILatestDonator } from "../../API/LatestDonators";
import ServerStatusRequest, { IServerStatus } from "../../API/ServerStatus";
import Box from "../../Components/Interface/Box";
import { AVATAR_ENDPOINT } from "../../globals";
import "./Home.sass";

declare interface IState {
  ServerStatus: IServerStatus;
  LatestDonators: ILatestDonator[];
}

class Home extends Component<any, IState> {
  public initialData = false;
  public interval: any;

  public ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
  public ONE_MONTH = 4 * 7 * 24 * 60 * 60 * 1000;
  public ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  public ONE_DAY = 24 * 60 * 60 * 1000;
  public ONE_HOUR = 60 * 60 * 1000;
  public ONE_MINUTE = 60 * 1000;
  public ONE_SECOND = 1000;

  constructor(props: any) {
    super(props);
    setTimeout(this.setData, 10);
    this.state = {
      ServerStatus: { // Error Prevention
        AverageAccuracy: 0,
        BannedUsers: 0,
        ConnectedUsers: 0,
        RegisteredUsers: 0,
        SubmittedScores: 0,
        TotalPerformancePoints: 0,
      },
      LatestDonators: [],
    };
  }

  public setData = async () => {
    try {
      if (!this.initialData) {
        Progress.show();
      }

      const status = new ServerStatusRequest();
      const latestDonis = new LatestDonatorsRequest();

      const statusResult = await status.Perform();
      const doniResult = await latestDonis.Perform();

      statusResult.TotalPerformancePoints = Math.round(statusResult.TotalPerformancePoints * 100) / 100;
      statusResult.AverageAccuracy = Math.round(statusResult.AverageAccuracy * 10000) / 10000 * 100;
      this.setState({
        ServerStatus: statusResult,
        LatestDonators: doniResult,
      });

      if (!this.initialData) {
        Progress.hide();
      }

      this.initialData = true;
    } finally {
      Progress.hide();
    }
  }

  public componentDidMount() {
    this.interval = setInterval(this.setData, 5000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    const donis = [];

    for (const e of this.state.LatestDonators) {
      const d = new Date(e.Until).getTime() - Date.now();
      let end = "Seconds";
      let x = 0;

      if (d / this.ONE_YEAR >= 2) {
        x = d / this.ONE_YEAR; end = "Years";
      } else if (d / this.ONE_YEAR >= 1) {
        x = d / this.ONE_YEAR; end = "Year";
      } else if (d / this.ONE_MONTH >= 2) {
        x = d / this.ONE_MONTH; end = "Months";
      } else if (d / this.ONE_MONTH >= 1) {
        x = d / this.ONE_MONTH; end = "Month";
      } else if (d / this.ONE_WEEK >= 2) {
        x = d / this.ONE_WEEK; end = "Weeks";
      } else if (d / this.ONE_WEEK >= 1) {
        x = d / this.ONE_WEEK; end = "Week";
      } else if (d / this.ONE_DAY >= 2) {
        x = d / this.ONE_DAY; end = "Days";
      } else if (d / this.ONE_DAY >= 1) {
        x = d / this.ONE_DAY; end = "Day";
      } else if (d / this.ONE_HOUR >= 2) {
        x = d / this.ONE_HOUR; end = "Hours";
      } else if (d / this.ONE_HOUR >= 1) {
        x = d / this.ONE_HOUR; end = "Hour";
      } else if (d / this.ONE_MINUTE >= 2) {
        x = d / this.ONE_MINUTE; end = "Minutes";
      } else if (d / this.ONE_MINUTE >= 1) {
        x = d / this.ONE_MINUTE; end = "Minute";
      } else { x = d / this.ONE_SECOND; }

      x = Math.round(x);

      donis.push(
        <td>
          <div className="infoBar green">
            <Link to={"/u/" + e.Id}>
              <img src={AVATAR_ENDPOINT + "/" + e.Id} alt="" />
              <h2>{e.UserName}</h2>
            </Link>
            <p>Expires in {x} {end}</p>
          </div>
        </td>,
      );
    }

    if (donis.length === 0) {
      donis.push(
        <td>
          <div>
            <h2>Nobody Donated :c</h2>
          </div>
        </td>,
      );
    }

    return (
      <div className="Home">
        <Box>
          <h1><b>osu!Gigamons</b></h1>
          <h2>
            Welcome to <b>Gigamons!</b> We're the world weirdest osu!Private Server! <br />
            There is nothing Special about this server <b>EXCEPT</b> that we work close with our Community
            to Enhance this Server! <br /> <br />

            This is just a Normal osu!Private Server with all features but <b>NO RIPPLE!</b>
            yes you heard correctly, this server uses <b>NOTHING</b> from ripple!
            This server is a Server written from Scratch in C#! <br /> our source code is available at <a href="https://github.com/Mempler/Sora" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> Github</a>.
          </h2>
        </Box>

        <Box>
          <h1> Server Statistics </h1>
          <table className="ServerInfo">
            <tbody>
              <tr>
                <td>
                  <div className="infoBar green">
                    <h2>Online Users</h2>
                    <p>{this.state.ServerStatus.ConnectedUsers}</p>
                  </div>
                </td>

                <td>
                  <div className="infoBar blue">
                    <h2>Registered Users</h2>
                    <p>{this.state.ServerStatus.RegisteredUsers}</p>
                  </div>
                </td>

                <td>
                  <div className="infoBar red">
                    <h2>Banned Users</h2>
                    <p>{this.state.ServerStatus.BannedUsers}</p>
                  </div>
                </td>

                <td>
                  <div className="infoBar yellow">
                    <h2>Submitted Scores</h2>
                    <p>{this.state.ServerStatus.SubmittedScores}</p>
                  </div>
                </td>

                <td>
                  <div className="infoBar purple">
                    <h2>Total Performance Points</h2>
                    <p>{this.state.ServerStatus.TotalPerformancePoints}</p>
                  </div>
                </td>

                <td>
                  <div className="infoBar gray">
                    <h2>Average Accuracy</h2>
                    <p>{Math.round(this.state.ServerStatus.AverageAccuracy * 100) / 100}%</p>
                  </div>
                </td>
              </tr>
            </tbody>

          </table>
        </Box>
        <Box>
          <h1> Our Donators </h1>
          <table className="Donators">
            <tbody>
              <tr>
                {donis}
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    );
  }
}

export default Home;
