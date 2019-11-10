import { APIRequest } from "../API";
import { IUser } from "./User";

export default class MeRequest extends APIRequest<IUser> {
  protected Endpoint = "/api/v1/me";
}
