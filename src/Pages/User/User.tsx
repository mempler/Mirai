import React, { Component } from "react";
import Progress from "react-progress-2";
import { RouteComponentProps, withRouter } from "react-router";
import UserRequest, { IUser } from "../../API/Users/User";
import Box from "../../Components/Interface/Box";
import Circle from "../../Components/Interface/Circle";
import { AVATAR_ENDPOINT } from "../../globals";
import "./User.sass";

declare interface IState {
  User: IUser;
}

class User extends Component<RouteComponentProps<any>, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      User: {
        accuracy: 0,
        achievements: [],
        country: "XX",
        globalRank: 0,
        id: 0,
        performance: 0,
        permissions: [],
        playCount: 0,
        rankedScore: 0,
        status: 0,
        statusReason: "",
        statusUntil: "",
        totalScore: 0,
        userName: ""
      }
    };
  }

  public componentDidMount() {
    this.setData();
  }

  public render() {
    return (
      <div className="UserPage">
        <Box className="userBox">
          <img
            className="avatar"
            src={AVATAR_ENDPOINT + "/" + this.state.User.id}
            alt="User Avatar."
          />
          <h1 className="username">{this.state.User.userName}</h1>
          <Circle />

          <h1 className="globalRank">#{this.state.User.globalRank}</h1>
        </Box>

        <Box className="UserStatistics">
          <div>
            <p>Something</p>
            <p className="right">Something</p>
          </div>

          <div>
            <p>Something</p>
          </div>
        </Box>
      </div>
    );
  }

  private setData = async () => {
    Progress.show();
    const userId = Number(this.props.match.params.id);
    const userReq = new UserRequest(userId);
    const user = await userReq.Perform();
    this.setState({
      User: user
    });
    Progress.hide();
  };
}

export default withRouter(props => <User {...props} />);
