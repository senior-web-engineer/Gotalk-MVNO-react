/* eslint-disable no-console */
/* eslint-disable require-yield */
import { startLoading, stopLoading } from '../workers/loading';
import { getPlans, getCurrentPlans, getPopularPlans } from '../workers/main-page';
import actionsType from '../workers/main-page/actions-type';
import { takeEvery, put, call } from 'redux-saga/effects';

export function* plansWorker() {
  try {
    yield put(startLoading('isLoadingPlan'));
    const { data } = yield call(getPlans);
    yield put({ type: actionsType.GET_PLANS, payload: data.payload.data.reverse() });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(stopLoading('isLoadingPlan'));
  }
}

export function* currentPlansWorker(params) {
  try {
    yield put(startLoading('isLoadingPlan'));
    const data = yield call(getCurrentPlans, params.id);
    yield put({ type: actionsType.GET_CURRENT_PLAN, payload: data.data.payload });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(stopLoading('isLoadingPlan'));
  }
}

export function* getPopularPlansSaga(params) {
  try {
    yield put(startLoading('isPopularPlansLoading'));
    const { data } = yield call(getPopularPlans, params.isModeBusiness);
    yield put({ type: actionsType.SET_POPULAR_PLANS, payload: data.payload.data });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(stopLoading('isPopularPlansLoading'));
  }
}

export default function* plansWatcher() {
  yield takeEvery(actionsType.LOAD_PLANS, plansWorker);
  yield takeEvery(actionsType.LOAD_CURRENT_PLAN, currentPlansWorker);
  yield takeEvery(actionsType.LOAD_POPULAR_PLANS, getPopularPlansSaga);
}
