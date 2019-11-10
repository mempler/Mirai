import { APIRequest } from "./API";

export interface IGlobalConfig {
  googleRecaptchaKey: string;
}

export default class GlobalConfigRequest extends APIRequest<IGlobalConfig> {
  protected Endpoint = "/api/v1/config";
}
