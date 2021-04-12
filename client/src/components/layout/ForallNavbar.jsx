import React, {useEffect} from 'react';
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

const ForallNavbar = ({history}) => {
  const state = useSelector(state => state.userLogin)
  const { loading,userInfo,error} = state;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUserAction())
  }
  console.log(userInfo)

  return (
    <div>
      <Navbar className="light navigation" color="primary" light expand="md">
        <NavbarToggler />
        <Collapse navbar>
          <Nav navbar className="">
            
            
            {userInfo ? (
              <>
                 
                <NavItem className="navs">
                  <NavLink><Link to="/">Home</Link></NavLink>
                </NavItem>
                <NavItem className="navs">
                  <NavLink><Link to="/userinfo">Activity</Link></NavLink>
                </NavItem>
                <NavItem className="navs">
                  <NavLink><Link to={`/profile/${userInfo?.user?._id}`}>Profile</Link></NavLink>
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
            <NavItem className="blank">
              <NavLink><Link to="/">   </Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/"><img src={download} className="logonav" alt="logo" /></Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default ForallNavbar;
