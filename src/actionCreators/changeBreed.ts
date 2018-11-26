export default function changeBreed(breed: string) {
  return { type: "SET_BREED", payload: breed };
}
