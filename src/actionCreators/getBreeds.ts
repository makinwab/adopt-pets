import pf from "petfinder-client";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no API keys");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default function getBreeds() {
  return function getBreedsThunk(
    dispatch: ({}) => void,
    getState: () => { animal: string }
  ) {
    const { animal } = getState();

    if (animal) {
      petfinder.breed
        .list({
          animal
        })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            dispatch({
              type: "SET_BREEDS",
              payload: data.petfinder.breeds.breed
            });
          } else {
            dispatch({ type: "SET_BREEDS", payload: [] });
          }
        });
    } else {
      dispatch({ type: "SET_BREEDS", payload: [] });
    }
  };
}
