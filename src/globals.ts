import { combineReducers, createStore } from "redux";
import Cookies from "universal-cookie";
import { LeaderboardReducer } from "./Actions/LeaderboardActions";
import { UserReducer } from "./Actions/UserActions";

// DO NOT CHANGE ANYTHING! This is just here for debug purpose!
export const API_ENDPOINT = "";
export const AVATAR_ENDPOINT = "";

export const cookies = new Cookies();

const AllReducer = combineReducers({ UserReducer, LeaderboardReducer });
export const SiteStateStore = createStore(AllReducer);
