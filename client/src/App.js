import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Signup from './components/auth/Signup';
import Post from './components/post/Post';
import Profile from './components/auth/Profile';
import { UserContext } from './UserContext';
import ForallNavbar from './components/layout/ForallNavbar';
import View from './components/home/View';
import Search from './components/home/Search';
import ViewUser from './components/auth/ViewUser';
import EditProfile from './components/home/EditProfile';
import Reset from './components/auth/Reset';
import NewPassword from './components/auth/NewPassword';
import './App.css';
import InfoGraph from './components/usergraph/InfoGraph';
function App() {

  return (
    <div className="App">
      <UserContext.Provider>
      <ForallNavbar />
        <Switch>
     
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpassword" component={Reset} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/post/:id" component={View} />
          <Route exact path="/user/:id" component={ViewUser} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/newpassword/:token" component={NewPassword} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/userinfo" component={InfoGraph} />
        </Switch>
      </UserContext.Provider>
      <Footer />
    </div>

  );
}

export default App;
