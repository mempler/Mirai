import { API_ENDPOINT, cookies } from "../globals";
import { SerializeURI } from "../Utils/StringUtils";
import { ErrorResponse } from "./ErrorResponse";

export enum ErrorCode {
    Success = 0,
    EMailVerification = 100,
    InvalidUser = 401,
    Recaptcha = 450,
}

export declare interface IErrorResponse {
    code: ErrorCode;
    message: string;
}

export enum Method {
    GET = "GET",
    POST = "POST",
}

export class APIRequest<T> {
    protected Method: Method = Method.GET;
    protected Endpoint: string = "";
    protected Body: undefined | object = undefined;
    protected Query: undefined | object = undefined;

    public async Perform() {
        const requestUri = `${API_ENDPOINT}${this.Endpoint}` + (this.Query ? "?" + SerializeURI(this.Query) : "");
        const response = await fetch(requestUri, {
            body: JSON.stringify(this.Body),
            headers: {
                Authorization: "Bearer " + cookies.get("AUTH_TOKEN"),
            },
            method: this.Method,
        });

        const jsonResponse = await response.json();

        if ((jsonResponse as IErrorResponse).message) {
            throw new ErrorResponse(jsonResponse);
        }

        return jsonResponse as T;
    }
}
