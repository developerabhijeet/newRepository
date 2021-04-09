import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, POST_REQUEST, POST_SUCCESS, POST_FAIL, USER_LOGOUT_SUCCESS, USER_EDITPROFILE_REQUEST, USER_EDITPROFILE_SUCCESS, USER_EDITPROFILE_FAIL, NEWPASSWORD_FAIL, NEWPASSWORD_REQUEST, NEWPASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAIL } from "../actions/users/actionTypes";
const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return {
        loading: true,
      };
    case IMAGE_SUCCESS:
      return {
        userInfo: action.payload,
      }
    case IMAGE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
const postReducer = (state = {}, action) => {
  switch (action.type) {
    //post
    case POST_REQUEST:
      return {
        loading: true,
      };
    case POST_SUCCESS:
      return {
        postInfo: action.payload,
      };
    case POST_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
}
const newPassword = (state = {}, action) => {
  switch (action.type) {
    case NEWPASSWORD_REQUEST:
      return {
        loading: true,
      }
    case NEWPASSWORD_SUCCESS:
      return {
        passwordInfo: action.payload,
      }
    case NEWPASSWORD_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
}
const resetPassword = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        resetInfo: action.payload,
      }
    case RESET_PASSWORD_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
}

const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDITPROFILE_REQUEST:
      return {
        loading: true,
      }
    case USER_EDITPROFILE_SUCCESS:
      return {
        user: action.payload,
        success: true,
      }
    case USER_EDITPROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };


    //Login
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
export { userReducer, postReducer, updateReducer, newPassword, resetPassword, uploadImageReducer };