import { API_WS_ENDPOINT } from "../globals";

export enum WSPacketID {
  TopLeaderboard = "LB_50"
}

export enum DataType {
  STRING = 0,
  INT8 = 1,
  INT16 = 2,
  INT32 = 3,
  INT64 = 3,
  FLOAT = 4,
  DOUBLE = 5,
  DATE = 6 // Unix Timestamp
}

export class WSAPI {
  private Socket = new WebSocket(API_WS_ENDPOINT);
  private Callbacks: Array<{
    reqId: number;
    id: WSPacketID;
    cb: (data: any) => any;
  }> = [];

  private OCCB: Array<(data: WSAPI) => any> = [];

  constructor() {
    this.Socket.onmessage = e => {
      console.log(e.data);
    };
    this.Socket.onopen = () => {
      for (const cb of this.OCCB) {
        cb(this);
      }
    };
  }

  public IsConnected = () => this.Socket.readyState === WebSocket.OPEN;

  public on = (t: "connected", cb: (api: WSAPI) => any) => {
    switch (t) {
      case "connected":
        this.OCCB.push(cb);
        break;

      default:
        break;
    }
  };

  public Request(id: WSPacketID, data: object) {
    const reqId = Math.round(Math.random() * (Math.pow(2, 32) - 1));
    const reqStr = id + " " + reqId + " " + JSON.stringify(data);

    this.Socket.send(reqStr);

    return {
      on: <T>(t: "data", cb: (data: T) => any) => {
        switch (t) {
          case "data":
            this.Callbacks.push({ cb, id, reqId });
            break;
        }
      }
    };
  }
}
