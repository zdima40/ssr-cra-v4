// ACTION
export const myActions = () => dispatch => {
  dispatch({ type: "ADD_DATA", payload: "Some text" });
  dispatch({ type: "ADD_DATA", payload: "Some text2" });
  dispatch({ type: "ADD_DATA2", payload: "Some text3" });
};
