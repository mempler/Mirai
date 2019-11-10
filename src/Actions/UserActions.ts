import Progress from "react-progress-2";
import { AnyAction, Reducer } from "redux";
import TokenAuthRequest from "../API/OAuth";
import MeRequest from "../API/Users/Me";
import { IUser } from "../API/Users/User";

export interface IUserState {
  User: IUser;
  IsLoggedIn: boolean;
}

export enum UserActionTypes {
  LOAD = "user.local_storage", // Load from LocalStorage instead of API!
  UPDATE = "user.update",
  LOGOUT = "user.logout",
  LOGIN = "user.login"
}

export interface IUserAction extends AnyAction {
  User: IUser;
  IsLoggedIn: boolean;
}

const EmptyUser: IUser = {
  id: 0,
  userName: "Anonymous",
  permissions: [],
  status: 0,
  statusUntil: "",
  statusReason: "",
  achievements: [],
  country: "",
  globalRank: 0,
  accuracy: 0,
  performance: 0,
  totalScore: 0,
  rankedScore: 0,
  playCount: 0
};

const EmptyUserState: IUserState = {
  User: EmptyUser,
  IsLoggedIn: false
};

export const UpdateActiveUser = async () => {
  try {
    Progress.show();

    let user;
    try {
      const meReq = new MeRequest();
      user = await meReq.Perform();
    } catch {
      user = EmptyUser;
    }

    return {
      type: UserActionTypes.UPDATE,
      User: user,
      IsLoggedIn: user.id > 0
    } as IUserAction;
  } finally {
    Progress.hide();
  }
};

export const LogoutActiveUser = () => {
  try {
    Progress.show();
    localStorage.removeItem("AUTH_TOKEN");
    return { type: UserActionTypes.LOGOUT } as IUserAction;
  } finally {
    Progress.hide();
  }
};

export const LoginActiveUser = async (username: string, password: string) => {
  try {
    Progress.show();

    const authReq = new TokenAuthRequest(username, password);
    const result = await authReq.Perform();

    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + result.expires_in);

    localStorage.setItem("AUTH_TOKEN", result.access_token);

    const meReq = new MeRequest();

    return {
      type: UserActionTypes.LOGIN,
      User: await meReq.Perform()
    } as IUserAction;
  } finally {
    Progress.hide();
  }
};

export const UserReducer: Reducer<IUserState, IUserAction> = (
  state = EmptyUserState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.UPDATE:
      return { User: action.User, IsLoggedIn: action.IsLoggedIn };
    case UserActionTypes.LOGIN:
      return { User: action.User, IsLoggedIn: action.User.id >= 1 };
    case UserActionTypes.LOGOUT:
      return { User: EmptyUser, IsLoggedIn: action.User.id >= 1 };

    default:
      return state;
  }
};
