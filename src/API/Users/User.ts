import { APIRequest } from "../API";

export interface IUser {
    id: number;
    userName: string;
    permissions: string[];
    status: number;
    statusUntil: string;
    statusReason: string;
    achievements: any[];
    country: string;
    globalRank: number;
    accuracy: number;
    performance: number;
    totalScore: number;
    rankedScore: number;
    playCount: number;
}

export default class UserRequest extends APIRequest<IUser> {
    constructor(user: number | string) {
        super();

        this.Endpoint = "/api/v1/users/" + user;
    }
}
