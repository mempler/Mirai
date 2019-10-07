import { APIRequest } from "./API";

export interface ILatestDonator {
    Id: number;
    UserName: string;
    Until: Date;
}

export default class LatestDonatorsRequest extends APIRequest<ILatestDonator[]> {
    protected Endpoint = "/api/v1/latest_donators";
}
