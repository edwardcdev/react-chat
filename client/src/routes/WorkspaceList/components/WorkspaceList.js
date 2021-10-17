import React from 'react';
import {
  Container, Row, Col, Alert,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import WorkspaceForm from './WorkspaceForm';
import ConfirmEmailForm from './ConfirmEmailForm';
import { WORKSPACE_LIST_TAB_LIST, WORKSPACE_LIST_TAB_CREATE, WORKSPACE_LIST_TAB_CONFIRM } from '../modules';

class WorkspaceList extends React.Component {
  componentDidMount() {
    this.props.getWorkspaceListRequest();
  }

  render() {
    const { loading, createWorkspace, activeTab, changeTab, workspaces, creating, createError, confirmEmailRequest, confirming, confirmed, } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === WORKSPACE_LIST_TAB_LIST })}
                    onClick={() => { changeTab(WORKSPACE_LIST_TAB_LIST); }}
                  >
                    Workspace list
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === WORKSPACE_LIST_TAB_CREATE })}
                    onClick={() => { changeTab(WORKSPACE_LIST_TAB_CREATE); }}
                  >
                    Create Workspace
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === WORKSPACE_LIST_TAB_CONFIRM })}
                    onClick={() => { changeTab(WORKSPACE_LIST_TAB_CONFIRM); }}
                  >
                    Confirm email
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId={WORKSPACE_LIST_TAB_LIST}>
                  { loading && <div>Loading...</div>}
                  { !loading && workspaces && workspaces.length === 0 &&
                    <Alert color="info">There is no workspace. Please create a new one</Alert>
                  }
                  { !loading && workspaces && workspaces.length > 0 &&
                    <ul className="list-group">
                      {workspaces.map(workspace =>
                        <li key={workspace.id} className="justify-content-between list-group-item">
                          <Row>
                            <Col>
                              {workspace.fullName}
                            </Col>
                            <Col>
                              <Link to={`/${workspace.displayName}`}>
                                {`${process.env.REACT_APP_HOST}/${workspace.displayName}`}
                              </Link>
                            </Col>
                          </Row>
                        </li>
                      )}
                    </ul>
                  }
                </TabPane>
                <TabPane tabId={WORKSPACE_LIST_TAB_CREATE}>
                  <WorkspaceForm createWorkspace={createWorkspace} loading={creating} error={createError} />
                </TabPane>
                <TabPane tabId={WORKSPACE_LIST_TAB_CONFIRM}>
                  <ConfirmEmailForm confirmEmailRequest={confirmEmailRequest} confirmed={confirmed} confirming={confirming} />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default WorkspaceList;
