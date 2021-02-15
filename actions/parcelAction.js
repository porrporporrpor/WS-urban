import { parcelService } from '../services';

const GET_ALL = 'parcel/getall';
const GET_ONE = 'parcel/getone';
const UPDATE_MARKASREAD = 'parcel/updatemarkasread';
const CLEAR_HISTORY = 'parcel/clearhistory';

const getAll = () => {
  return (dispatch) => {
    parcelService.callGetAll().then((parcelList) => {
      dispatch({ type: GET_ALL, payload: parcelList });
    });
  };
};

const getOne = (parcelID) => {
  return (dispatch) => {
    parcelService.callGetOne(parcelID).then((parcelInfo) => {
      dispatch({ type: GET_ONE, payload: parcelInfo });
    }),
      (error) => {
        dispatch({ type: CLEAR_HISTORY, error });
      };
  };
};

const updateMarkAsRead = (parcelID) => {
  return (dispatch) => {
    parcelService.callUpdateMarkAsRead(parcelID).then((status) => {
      if (status === 'success') {
        dispatch({ type: UPDATE_MARKASREAD, payload: parcelID });
      }
    });
  };
};

const clearHistory = (parcelID) => {
  return (dispatch) => {
    parcelService.callClearHistory(parcelID).then((parcelList) => {
      dispatch({ type: CLEAR_HISTORY, payload: parcelList });
    }),
      (error) => {
        dispatch({ type: CLEAR_HISTORY, error });
      };
  };
};

export const parcelAction = {
  GET_ALL,
  GET_ONE,
  UPDATE_MARKASREAD,
  CLEAR_HISTORY,
  getAll,
  getOne,
  updateMarkAsRead,
  clearHistory,
};
