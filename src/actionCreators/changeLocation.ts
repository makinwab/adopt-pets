export default function changeLocation(location: string) {
  return { type: "SET_LOCATION", payload: location };
}
