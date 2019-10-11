import { combineReducers, createStore } from "redux";
import Cookies from "universal-cookie";
import { GlobalConfigReducer } from "./Actions/GlobalConfigActions";
import { LeaderboardReducer } from "./Actions/LeaderboardActions";
import { UserReducer } from "./Actions/UserActions";

// DO NOT CHANGE ANYTHING! This is just here for debug purpose!
export const API_ENDPOINT_DOMAIN = "localhost:4312";
export const API_ENDPOINT = "http://" + API_ENDPOINT_DOMAIN;
export const AVATAR_ENDPOINT = "http://localhost:4312";
export const API_WS_ENDPOINT = "ws://" + API_ENDPOINT_DOMAIN + "/api/v1/ws";

export const cookies = new Cookies();

const AllReducer = combineReducers({ UserReducer, LeaderboardReducer, GlobalConfigReducer });
export const SiteStateStore = createStore(AllReducer);
