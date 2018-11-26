import { combineReducers, Reducer } from "redux";
import location from "./location";
import animal from "./animal";
import breed from "./breed";
import breeds from "./breeds";

export default combineReducers<Reducer>({ location, animal, breed, breeds });
