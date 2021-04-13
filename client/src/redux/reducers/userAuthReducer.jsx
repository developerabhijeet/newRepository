import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, POST_REQUEST, POST_SUCCESS, POST_FAIL, USER_LOGOUT_SUCCESS, USER_EDITPROFILE_REQUEST, USER_EDITPROFILE_SUCCESS, USER_EDITPROFILE_FAIL, NEWPASSWORD_FAIL, NEWPASSWORD_REQUEST, NEWPASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAIL, LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAIL, UNLIKE_REQUEST, UNLIKE_SUCCESS, UNLIKE_FAIL, COMMENT_FAIL, COMMENT_SUCCESS, COMMENT_REQUEST } from "../actions/users/actionTypes";

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        loading: true,
      }
    case COMMENT_SUCCESS:
      return {
        commment: action.payload,
        success: true,
      }
    case COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

const unlikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case UNLIKE_REQUEST:
      return {
        loading: true,
      }
    case UNLIKE_SUCCESS:
      return {
        unlike: action.payload,
        success: true,
      }
    case UNLIKE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return {
        loading: true,
      }
    case LIKE_SUCCESS:
      return {
        like: action.payload,
        success: true,
      }
    case LIKE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return {
        loading: true,
      };
    case IMAGE_SUCCESS:
      return {
        image: action.payload,
        success: true,
      };
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

export { userReducer, postReducer, updateReducer, newPassword, resetPassword, uploadImageReducer, likePostReducer, unlikePostReducer, commentReducer };