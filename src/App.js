import React from "react";
import { Router } from "@reach/router";
// import Loadable from "react-loadable";
import NavBar from "./NavBar";
import Details from "./Details";
import Results from "./Results";
import SearchParams from "./SearchParams";
import { Provider } from "react-redux";
import store from "./store";

// const LoadableDetails = Loadable({
//   loader: () => import("./Details"),
//   modules: ["./Details"],
//   loading() {
//     return <h1> loading split out code... </h1>;
//   }
// });

// const LoadableResults = Loadable({
//   loader: () => import("./Results"),
//   modules: ["./Results"],
//   loading() {
//     return <h1> loading split out code... </h1>;
//   }
// });

// const LoadableSearchParams = Loadable({
//   loader: () => import("./SearchParams"),
//   modules: ["./SearchParams"],
//   loading() {
//     return <h1> loading split out code... </h1>;
//   }
// });

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Provider store={store}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
