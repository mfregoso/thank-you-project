import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      userLatitude: null,
      userLongitude: null
    };
  }

  if (action.type === "SET_USER_LATITUDE") {
    return {
      ...state,
      userLatitude: action.setLatitude
    };
  }

  if (action.type === "SET_USER_LONGITUDE") {
    return {
      ...state,
      userLongitude: action.setLongitude
    };
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
