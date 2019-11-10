import { APIRequest, Method } from "./API";

export interface ITokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
}

export default class TokenAuthRequest extends APIRequest<ITokenResponse> {
  protected Endpoint = "/oauth/auth";
  protected Method = Method.POST;

  constructor(username: string = "", password: string = "") {
    super();

    this.Body = {
      username,
      // tslint:disable-next-line: object-literal-sort-keys
      password
    };
  }
}
