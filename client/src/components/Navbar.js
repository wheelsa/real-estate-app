import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={() => handleLogout(this.props.history)}
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
       
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
          </Link>
          <Link to='/available'>
            <Menu.Item
              id='available'
              name='available'
              active={this.props.location.pathname === '/available'}
            />
          </Link>
          <Link to='/cities'>
            <Menu.Item
              id='cities'
              name='cities'
              active={this.props.location.pathname === '/cities'}
            />
          </Link>

          <Link to='/findHomes'>
            <Menu.Item
              id='homes'
              name='Homes'
              active={this.props.location.pathname === '/findHomes'}
            />
          </Link>
          <Link to='/city_cost'>
            <Menu.Item
              id='city_cost'
              name='City Cost'
              active={this.props.location.pathname === '/city_cost'}
            />
          </Link>

          { this.rightNavItems() }
        </Menu>
      </div>
    );
  };
};

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Navbar {...this.props} auth={auth} />
        }
      </AuthConsumer>
    );
  };
};

export default withRouter(ConnectedNavbar);
