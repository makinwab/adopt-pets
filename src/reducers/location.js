export default function locationReducer(state = "Seattle, WA", action) {
  if (action.type == "SET_LOCATION") {
    return action.payload;
  } else {
    return state;
  }
}
