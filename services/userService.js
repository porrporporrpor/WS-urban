const callGetOne = async (userID) => {
  console.log('callGetOne user service');
  try {
    userInfo = {
      avatar:
        'https://img-ha.mthcdn.com/q76I5xaMVSFrS2D1wcJjj7qAFHs=/mthai.com/app/uploads/2020/08/payu-49-819x1024.jpg',
      firstname: 'PP',
      lastname: 'Account',
    };
    console.log('finish getone user service');
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

const callUpdateUser = async (userID, updateData) => {
  console.log('callUpdateUser user service');
  try {
    return 'success';
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  callGetOne,
  callUpdateUser,
};
