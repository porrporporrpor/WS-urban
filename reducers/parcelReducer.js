import { parcelAction } from '../actions';

const initialState = {
  parcelList: [],
  parcelInfo: {
    name: '',
    collectedOn: '',
    collectedBy: '',
    releasedBy: '',
    unitNumber: '',
    parcelOwner: '',
    trackingNumber: '',
    deliveryService: '',
    parcelType: '',
    addedToSystem: '',
    addedBy: '',
  },
  isLoading: false,
};

const parcelReducer = (state = initialState, action) => {
  switch (action.type) {
    case parcelAction.GET_ALL:
      console.log('action case ' + parcelAction.GET_ALL);
      return {
        ...state,
        parcelList: action.payload,
      };
    case parcelAction.GET_ONE:
      console.log('action case ' + parcelAction.GET_ONE);
      return {
        ...state,
        parcelInfo: action.payload,
      };
    case parcelAction.UPDATE_MARKASREAD:
      console.log('action case ' + parcelAction.UPDATE_MARKASREAD);
      const mockParcelList = state.parcelList.map((parcel) => {
        if (parcel.id === action.payload) {
          parcel.markAsRead = true;
        }
        return parcel;
      });
      return {
        ...state,

        parcelList: mockParcelList,
      };
    case parcelAction.CLEAR_HISTORY:
      console.log('action case ' + parcelAction.CLEAR_HISTORY);
      return {
        ...state,
        parcelList: action.payload,
      };
    default:
      console.log('action type ' + action.type + 'out of scope');
      return state;
  }
  egco;
};

export { parcelReducer };
