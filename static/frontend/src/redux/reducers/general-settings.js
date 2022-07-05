import generalSettingsTypes from "../workers/general-settings/general-settings-types";

const initialState = {
    generalSettings: null
}

const generalSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case generalSettingsTypes.GENERAL_SETTINGS:
            return { ...state, generalSettings: action.payload };

        default:
            return state;
    }
}

export default generalSettingsReducer;
