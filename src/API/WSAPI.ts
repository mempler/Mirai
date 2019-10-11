import { API_WS_ENDPOINT } from "../globals";

export enum WSPacketID {
    TopLeaderboard = "LB_50",
}

export enum PacketType {
    REQ = 0x01, // 0x01 (00000001) = REQ
    ACK = 0x02, // 0x02 (00000010) = ACK
}
export enum DataType {
    STRING = 0,
    INT8 = 1,
    INT16 = 2,
    INT32 = 3,
    INT64 = 3,
    FLOAT = 4,
    DOUBLE = 5,
    DATE = 6, // Unix Timestamp
}

export class WSAPI {
    private Socket = new WebSocket(API_WS_ENDPOINT);
    private Callbacks: Array<{ reqId: number, id: WSPacketID, cb: (data: any) => void }> = [];

    public IsConnected = () => this.Socket.readyState === WebSocket.OPEN;

    constructor() {
        this.Socket.onmessage = (e) => {
            console.log(e.data);
        }
    }

    public on = (t: "connected", cb: ((api: WSAPI) => void)) => {
        this.Socket.onopen = (e) => {
            cb(this);
        };
    }

    public Request(type: PacketType, id: WSPacketID, data: object) {
        const reqId = (Math.random() * (Math.round(Math.pow(2, 32)) - 1));
        const reqStr = type + " " + id + " " + reqId + " " + JSON.stringify(data);

        this.Socket.send(reqStr);

        return {
            on: <T>(t: "data", cb: (data: T) => void) => {
                switch (t) {
                    case "data":
                        this.Callbacks.push({ cb, id, reqId });
                        break;
                }
            },
        };
    }
}
