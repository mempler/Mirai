import { APIRequest, Method } from "./API";

// this will 100% throw an error! due to the nature of APIRequest
// but we'll take advantage of that!
export default class SignUpRequest extends APIRequest<{}> {
    protected Endpoint = "/api/v1/signup";
    protected Method = Method.POST;

    constructor(username: string, password: string, email: string, gcaptcha: string) {
        super();

        this.Body = {
            UserName: username,
            Password: password,
            EMail: email,
            GCaptchaValidation: gcaptcha,
        };
    }
}
