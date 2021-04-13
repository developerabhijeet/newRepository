import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import download from './download.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAction } from '../../redux/actions/users/userActions';

const ForallNavbar = () => {
  const state = useSelector(state => state.userRegister)
  console.log(state)
  const {loading, userInfo, error} = state;
 
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUserAction())
  }
  
  return (
    <div>
      <Navbar className="light navigation" color="primary" light expand="md">
        <NavbarToggler />
        <Collapse navbar>
          <Nav navbar className="">
            <NavItem>
              <NavLink><Link to="/"><img src={download} className="logonav" alt="logo" /></Link></NavLink>
            </NavItem>
            
            {userInfo ? (
              <>
                <NavItem className="navs">
                  <NavLink><Link to="/">Home</Link></NavLink>
                </NavItem>
                <NavItem className="navs">
                  <NavLink><Link to={`/profile/${userInfo?.user._id}`}>Profile</Link></NavLink>
                </NavItem>
                <NavItem className="navs">
                  <NavLink onClick={logoutHandler}><Link to="/login"> Logout</Link></NavLink>
                </NavItem>
              </>
            ) : (<>
              <NavItem className="navs">
                <NavLink><Link to="/login"> Login  </Link></NavLink>
              </NavItem>
              <NavItem className="navs">
                <NavLink><Link to="/signup">  Signup </Link></NavLink>
              </NavItem>
            </>)}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default ForallNavbar;
