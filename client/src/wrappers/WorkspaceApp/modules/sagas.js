import { call, all, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import {
  WORKSPACE_APP_GET_REQUEST,
  WORKSPACE_APP_GET_SUCCESS,
  WORKSPACE_APP_GET_ERROR,
} from './';
import { anonymousRequest } from '../../../utils/apiCaller';

function* fetchWorkspace(action) {
  try {
    const workspaceName = action.payload;
    const workspaceResponse = yield call(anonymousRequest, 'get', `/workspaces/byName/${workspaceName}`);
    yield put({ type: WORKSPACE_APP_GET_SUCCESS, payload: workspaceResponse.data });
  } catch (error) {
    yield put(push('/'));
    yield put({ type: WORKSPACE_APP_GET_ERROR, error });
    toastr.error('There is something wrong.');
  }
}

export default function* watchWorkspace() {
  yield all([
    yield takeLatest(WORKSPACE_APP_GET_REQUEST, fetchWorkspace),
  ]);
}
