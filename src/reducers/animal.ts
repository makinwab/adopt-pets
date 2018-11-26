interface Action {
  type: string;
  payload: string;
}

export default function animalReducer(state = "", action: Action) {
  if (action.type === "SET_ANIMAL") {
    return action.payload;
  } else {
    return state;
  }
}
