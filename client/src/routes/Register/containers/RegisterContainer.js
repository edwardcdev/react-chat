import { connect } from 'react-redux';
import Register from '../components/Register';
import { registerUser } from '../modules/actions';

export default connect(
  ({ register, workspaceApp: { workspace } }) => ({ ...register, workspace }),
  (dispatch) => ({
    registerUser: (form) => dispatch(registerUser(form)),
  }),
)(Register);
