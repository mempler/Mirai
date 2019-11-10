import { APIRequest } from "../API";

export interface ITopLeaderboard {
  Id: number;
  Username: string;
  Accuracy: number;
  Performance: number;
  TotalScore: number;
  RankedScore: number;
  PlayCount: number;
  Country: string;
}

export default class TopLeaderboardRequest extends APIRequest<
  ITopLeaderboard[]
> {
  protected Endpoint = "/api/v1/get_top_leaderboard";

  constructor(offset: number, mode: number) {
    super();
    this.Query = {
      mode,
      offset
    };
  }
}
