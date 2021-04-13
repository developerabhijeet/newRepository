import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newPassword, postReducer, updateReducer, userReducer, resetPassword, uploadImageReducer, likePostReducer, unlikePostReducer, commentReducer } from '../reducers/userAuthReducer';

const middlewares = [thunk];
//combining all reducers
const reducer = combineReducers({
  userLogin: userReducer,//for Signup and Login both
 
  postProblem: postReducer,
  updatedUser: updateReducer,
  updatePassword: newPassword,
  requestPassword: resetPassword,
  uploadImage: uploadImageReducer,
  likePost : likePostReducer,
  unlikePost: unlikePostReducer,
  comment: commentReducer,
});
//getting user from localStorage and save it into our store

const userAuthFromStorage = localStorage.getItem('userAuthData')
  ? JSON.parse(localStorage.getItem('userAuthData')) : null;

const initialState = {
  userLogin: { userInfo: userAuthFromStorage },
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;