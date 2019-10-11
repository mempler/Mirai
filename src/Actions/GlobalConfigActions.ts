import Progress from "react-progress-2";
import { AnyAction, Reducer } from "redux";
import GlobalConfigRequest, { IGlobalConfig } from "../API/GlobalConfig";

export interface IGlobalConfigState {
    Config: IGlobalConfig;
}

export enum GlobalConfigActions {
    UPDATE = "global.config.update",
}

export interface IGlobalConfigAction extends AnyAction, IGlobalConfigState { }

const EmptyConfig: IGlobalConfigState = {
    Config: {
        googleRecaptchaKey: "",
    },
};

export const UpdateConfig = async () => {
    try {
        Progress.show();
        const cfgReq = new GlobalConfigRequest();
        return { type: GlobalConfigActions.UPDATE, Config: await cfgReq.Perform() } as IGlobalConfigAction;
    } finally {
        Progress.hide();
    }
};

export const GlobalConfigReducer: Reducer<IGlobalConfigState, IGlobalConfigAction> =
    (state = EmptyConfig, action) => {
        switch (action.type) {
            case GlobalConfigActions.UPDATE:
                return { Config: action.Config };
            default:
                return state;
        }
    };
