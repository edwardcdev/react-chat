import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginUser } from '../modules/actions';

export default connect(
  ({ auth, workspaceApp: { workspace } }) => ({ ...auth, workspace }),
  (dispatch) => ({
    loginUser: (form) => dispatch(loginUser(form)),
  }),
)(Login);
