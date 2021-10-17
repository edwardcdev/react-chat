import { connect } from 'react-redux';
import WorkspaceList from '../components/WorkspaceList';
import {
  getWorkspaceListRequest,
  createWorkspaceRequest,
  changeTab,
  confirmEmailRequest,
} from '../modules/actions';

export default connect(
  ({ workspaceList }) => ({ ...workspaceList }),
  dispatch => ({
    getWorkspaceListRequest: () => dispatch(getWorkspaceListRequest()),
    createWorkspace: values => dispatch(createWorkspaceRequest(values)),
    changeTab: tab => dispatch(changeTab(tab)),
    confirmEmailRequest: values => dispatch(confirmEmailRequest(values)),
  }),
)(WorkspaceList);
