import API from '../../../axios/api';
import { GENERAL_SETTINGS } from '../../../axios/api-urls';

const api = new API();

export const getGeneralSettings = () => api.get(GENERAL_SETTINGS.getSettings);
