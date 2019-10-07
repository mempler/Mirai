import { APIRequest } from "./API";

export interface IServerStatus {
    ConnectedUsers: number;
    RegisteredUsers: number;
    BannedUsers: number;
    SubmittedScores: number;
    TotalPerformancePoints: number;
    AverageAccuracy: number;
}

export default class ServerStatusRequest extends APIRequest<IServerStatus> {
    protected Endpoint = "/api/v1/status";
}
