import { combineReducers, createStore } from "redux";
import Cookies from "universal-cookie";
import { GlobalConfigReducer } from "./Actions/GlobalConfigActions";
import { LeaderboardReducer } from "./Actions/LeaderboardActions";
import { UserReducer } from "./Actions/UserActions";

export const AVATAR_ENDPOINT = "https://a.gigamons.de";

// DO NOT CHANGE ANYTHING! This is just here for debug purpose!
export const API_ENDPOINT_DOMAIN = "dev.gigamons.de";
export const API_ENDPOINT = "https://" + API_ENDPOINT_DOMAIN;
export const API_WS_ENDPOINT = "ws://" + API_ENDPOINT_DOMAIN + "/api/v1/ws";

export const cookies = new Cookies();

const AllReducer = combineReducers({
  UserReducer,
  LeaderboardReducer,
  GlobalConfigReducer
});
export const SiteStateStore = createStore(AllReducer);
