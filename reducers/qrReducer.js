import { qrAction } from '../actions';

const initialState = {
  qrContent: '',
  isLoading: false,
};

const qrReducer = (state = initialState, action) => {
  switch (action.type) {
    case qrAction.SCAN_QR:
      console.log('action case ' + qrAction.SCAN_QR);
      return {
        ...state,
        qrContent: action.payload,
      };
    default:
      console.log('action type ' + action.type + ' out of scope');
      return state;
  }
};

export { qrReducer };
