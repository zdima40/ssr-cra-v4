import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  routing: routerReducer,
  reducer1,
  reducer2
});

function reducer1(state = [], action) {
  switch (action.type) {
    case "ADD_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
}
function reducer2(state = [], action) {
  switch (action.type) {
    case "ADD_DATA2":
      return [...state, action.payload];
    default:
      return state;
  }
}
