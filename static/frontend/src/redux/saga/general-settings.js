import {getGeneralSettings} from "../workers/general-settings/general-settings";
import { call, takeLatest, put } from 'redux-saga/effects';
import generalSettingsTypes from "../workers/general-settings/general-settings-types";

function* getGeneralSettingsSaga() {
    try {
        const { data } = yield call(getGeneralSettings);
        yield put({
            type: generalSettingsTypes.GENERAL_SETTINGS,
            payload: data?.payload
        });
    }
    catch {}
}

export default function* generalSettingsWatcher() {
    yield takeLatest([generalSettingsTypes.GET_GENERAL_SETTINGS], getGeneralSettingsSaga);
}
