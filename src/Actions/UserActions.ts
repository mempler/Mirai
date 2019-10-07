import Progress from "react-progress-2";
import { AnyAction, Reducer } from "redux";
import MeRequest from "../API/Users/Me";
import { IUser } from "../API/Users/User";
import { cookies } from "../globals";

export interface IUserState {
    User: IUser;
    IsLoggedIn: boolean;
}

export enum UserActionTypes {
    UPDATE = "user.update",
    LOGOUT = "user.logout",
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
    playCount: 0,
};

const EmptyUserState: IUserState = {
    User: EmptyUser,
    IsLoggedIn: false,
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

        return { type: UserActionTypes.UPDATE, User: user, IsLoggedIn: user.id > 0 } as IUserAction;
    } finally {
        Progress.hide();
    }
};

export const LogoutActiveUser = () => {
    try {
        Progress.show();
        cookies.remove("AUTH_TOKEN");
        return { type: UserActionTypes.LOGOUT } as IUserAction;
    } finally {
        Progress.hide();
    }
};

export const UserReducer: Reducer<IUserState, IUserAction> = (state = EmptyUserState, action) => {
    switch (action.type) {
        case UserActionTypes.UPDATE:
            return { User: action.User, IsLoggedIn: action.IsLoggedIn };
        case UserActionTypes.LOGOUT:
            return { User: EmptyUser, IsLoggedIn: false };

        default:
            return state;
    }
};
