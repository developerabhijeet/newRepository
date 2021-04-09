//causing change of state in application
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, POST_REQUEST, POST_SUCCESS, POST_FAIL, USER_EDITPROFILE_FAIL, USER_EDITPROFILE_SUCCESS, USER_EDITPROFILE_REQUEST, USER_LOGOUT_SUCCESS, NEWPASSWORD_FAIL, NEWPASSWORD_REQUEST, NEWPASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAIL } from './actionTypes';
import axios from 'axios';

const signupuserAction = (name, email, password, bio, jobtitle, tech) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:4000/app/signup', {
        name,
        email,
        password,
        bio,
        jobtitle,
        tech
      },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      });
      //saving user to localstorage
      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Login Action 

const loginUserAction = (email, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:4000/app/login', {
        email,
        password,
      },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      console.log(data);
      //saving user to localStorage
      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//post problem  
const postAction = (name, post, domain) => {
  return async dispatch => {
    try {
      dispatch({
        type: POST_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:4000/app/post', {
        name,
        post,
        domain,
      },
        config
      ); dispatch({
        type: POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//user Logout

const logoutUserAction = () => async dispatch => {
  try {
    localStorage.removeItem('userAuthData');
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (error) {
  }
};

//edit user profile
const editUserProfile = (id, bio, tech, jobtitle) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EDITPROFILE_REQUEST,

      });
      const { userInfo } = getState().userLogin;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo._id}`,
        },
      };
      const { data } = axios.put('http://localhost:4000/app/editprofile', {
        id,
        bio,
        tech,
        jobtitle,
      },
        config
      );
      dispatch({
        type: USER_EDITPROFILE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_EDITPROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//request for new password
const newPasswordAction = (token, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: NEWPASSWORD_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:4000/app/newpassword', {
        token,
        password,
      },
        config
      );
      dispatch({
        type: NEWPASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEWPASSWORD_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  }
}

//reset new password
const resetPasswordAction = (email) => {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:4000/app/resetpassword', {
        email,
      },
        config
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  }
}

//user profile image upload 
const uploadImageAction = (userid, filedata) => {
  return async dispatch => {
    try {
      dispatch({
        type: IMAGE_REQUEST,
      });;
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      console.log("name",filedata);
      const data = await axios.post('http://localhost:4000/app/upload', {
        userid,
        filedata,
      },
        config
      );
      console.log(data)
      dispatch({
        type: IMAGE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: IMAGE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  }
}

export { signupuserAction, loginUserAction, postAction, logoutUserAction, editUserProfile, newPasswordAction, resetPasswordAction, uploadImageAction };