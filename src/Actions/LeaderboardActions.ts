import Progress from "react-progress-2";
import { AnyAction, Reducer } from "redux";
import TopLeaderboardRequest, { ITopLeaderboard } from "../API/Leaderboard/TopLeaderboard";

export interface ILeaderboardState {
    Entries: ITopLeaderboard[];
}

export enum LeaderboardActions {
    UPDATE = "leaderboard.update",
    LOAD_MORE = "leaderboard.load_more",
}

export interface ILeaderboardAction extends AnyAction, ILeaderboardState { }

const EmptyLeaderboardState: ILeaderboardState = {
    Entries: [],
};

export const UpdateLeaderboard = async (mode: number, offset: number) => {
    try {
        Progress.show();
        const lbReq = new TopLeaderboardRequest(offset, mode);
        return { type: LeaderboardActions.UPDATE, Entries: await lbReq.Perform() } as ILeaderboardAction;
    } finally {
        Progress.hide();
    }
};

export const LoadMoreLeaderboard = async (mode: number, offset: number) => {
    try {
        Progress.show();
        const lbReq = new TopLeaderboardRequest(offset, mode);
        return { type: LeaderboardActions.LOAD_MORE, Entries: await lbReq.Perform() } as ILeaderboardAction;
    } finally {
        Progress.hide();
    }
};

export const LeaderboardReducer: Reducer<ILeaderboardState, ILeaderboardAction> =
    (state = EmptyLeaderboardState, action) => {
        switch (action.type) {
            case LeaderboardActions.UPDATE:
                return { Entries: action.Entries };

            case LeaderboardActions.LOAD_MORE:
                return { Entries: [...state.Entries, ...action.Entries] };

            default:
                return state;
        }
    };
