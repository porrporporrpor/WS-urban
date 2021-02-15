const initialState = {
  userData: {},
  userAccessToken: '',
  userRefreshToken: '',
  error: '',
  isLogin: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.Type) {
    case 'STARTED':
    case 'SUCCESS':
    case 'ERROR':
  }
};

export default authenticationReducer;
