import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

class Sidebar extends Component {
  render() {
    const channels = this.props.channels.filter((c) => !c.direct);
    const dms = this.props.channels.filter((c) => c.direct);
    const workspace = this.props.workspace;

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>
            <li className="nav-title">Channels</li>
            {
              channels.map((channel) => {
                return (
                  <NavItem key={channel.id}>
                    <NavLink to={`/${workspace.displayName}/messages/${channel.id}`} className="nav-link" activeClassName="active">
                      # {channel.name}
                    </NavLink>
                  </NavItem>
                );
              })
            }
            { dms.length > 0 && <li className="nav-title">Direct messages</li> }
            {
              dms.map((channel) => {
                return (
                  <NavItem key={channel.id}>
                    <NavLink to={`/${workspace.displayName}/messages/${channel.id}`} className="nav-link" activeClassName="active">
                      <i className="fa fa-circle"></i>{channel.name}
                    </NavLink>
                  </NavItem>
                );
              })
            }
          </Nav>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
