import React from "react";
import ReactDOM from "react-dom";
import Progress from "react-progress-2";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ITopLeaderboard } from "./API/Leaderboard/TopLeaderboard";
import { WSAPI, WSPacketID } from "./API/WSAPI";
import i18n from "./Components/I18n";
import { SiteStateStore } from "./globals";
import App from "./Pages/App";
import * as serviceWorker from "./serviceWorker";
import "./Style/index.sass";

i18n.on("initialized", async () => {
  ReactDOM.render(
    <Provider store={SiteStateStore}>
      <BrowserRouter>
        <Progress.Component />
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});

const wsapi = new WSAPI();
wsapi.on("connected", api => {
  api
    .Request(WSPacketID.TopLeaderboard, {
      mode: 0,
      offset: 0
    })
    .on("data", (data: ITopLeaderboard) => {
      console.info(data);
    });
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
