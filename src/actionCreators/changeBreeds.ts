export default function changeBreeds(breeds: string[]) {
  return { type: "SET_BREEDS", payload: breeds };
}
