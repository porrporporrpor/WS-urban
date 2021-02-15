import { userService } from '../services';

const GET_ONE = 'user/getone';
const UPDATE = 'user/update';

const getOne = (userID) => {
  console.log('come in user getone action');
  return async (dispatch) => {
    await userService.callGetOne(userID).then((userInfo) => {
      console.log(userInfo);
      dispatch({ type: GET_ONE, payload: userInfo });
    });
  };
};
const updateUserProfile = (userID, updateData) => {
  return (dispatch) => {
    userService
      .callUpdateUser(updateData)
      .then(
        userService
          .callGetOne(userID)
          .then((userInfo) => dispatch({ type: GET_ONE, payload: updateData }))
      );
  };
};

export const userAction = {
  GET_ONE,
  UPDATE,
  getOne,
  updateUserProfile,
};
