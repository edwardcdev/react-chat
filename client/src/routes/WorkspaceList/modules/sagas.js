import { call, all, takeEvery, put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import {
  WORKSPACE_LIST_GET_REQUEST,
  WORKSPACE_LIST_GET_SUCCESS,
  WORKSPACE_LIST_GET_ERROR,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_ERROR,
  WORKSPACE_LIST_TAB_LIST,
  WORKSPACE_CONFIRM_EMAIL_REQUEST,
  WORKSPACE_CONFIRM_EMAIL_SUCCESS,
  WORKSPACE_CONFIRM_EMAIL_ERROR,
} from './';
import { changeTab } from './actions';
import { anonymousRequest } from '../../../utils/apiCaller';

function* fetchWorkspaceList() {
  try {
    const workspaceResponse = yield call(anonymousRequest, 'get', '/workspaces');
    yield put({ type: WORKSPACE_LIST_GET_SUCCESS, payload: workspaceResponse.data });
  } catch (error) {
    yield put({ type: WORKSPACE_LIST_GET_ERROR, error });
  }
}

function* createWorkspace(action) {
  try {
    const workspaceResponse = yield call(anonymousRequest, 'post', '/workspaces', { body: action.payload });
    yield put({ type: WORKSPACE_CREATE_SUCCESS });
    yield put(reset('workspaceForm'));
    yield call(fetchWorkspaceList);
    yield put(changeTab(WORKSPACE_LIST_TAB_LIST));
    toastr.success(`Workspace ${workspaceResponse.data.fullName} is created successfully`);
  } catch (error) {
    yield put({ type: WORKSPACE_CREATE_ERROR, error });
    toastr.error(error);
  }
}

function* confirmEmail(action) {
  try {
    yield call(anonymousRequest, 'post', '/auth/confirm', { body: action.payload });
    yield put({ type: WORKSPACE_CONFIRM_EMAIL_SUCCESS });
    yield put(reset('confirmEmailForm'));
    toastr.success('Email is confirmed successfully');
  } catch (error) {
    yield put({ type: WORKSPACE_CONFIRM_EMAIL_ERROR, error });
    toastr.error(error.message);
  }
}

export default function* watchWorkspaceList() {
  yield all([
    yield takeEvery(WORKSPACE_LIST_GET_REQUEST, fetchWorkspaceList),
    yield takeEvery(WORKSPACE_CREATE_REQUEST, createWorkspace),
    yield takeEvery(WORKSPACE_CONFIRM_EMAIL_REQUEST, confirmEmail),
  ]);
}
