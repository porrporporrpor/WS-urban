import { userAction } from '../actions';

const initialState = {
  userList: [],
  userInfo: {
    avatar: '',
    firstname: '',
    lastname: '',
  },
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userAction.GET_ONE:
      console.log('action case ' + userAction.GET_ONE);
      return {
        ...state,
        userInfo: action.payload,
      };
    case userAction.UPDATE:
      console.log('action case ' + userAction.UPDATE);
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      console.log('action type ' + action.type + ' out of scope');
      return state;
  }
};

export { userReducer };
