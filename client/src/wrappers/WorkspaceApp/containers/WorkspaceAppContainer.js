import { connect } from 'react-redux';
import WorkspaceApp from '../components/WorkspaceApp';
import { getWorkspace } from '../modules/actions';

export default connect(
  ({ workspaceApp }) => ({ ...workspaceApp }),
  dispatch => ({
    getWorkspace: name => dispatch(getWorkspace(name)),
  }),
)(WorkspaceApp);
