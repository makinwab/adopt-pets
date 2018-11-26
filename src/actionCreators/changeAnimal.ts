export default function changeAnimal(animal: string) {
  return { type: "SET_ANIMAL", payload: animal };
}
