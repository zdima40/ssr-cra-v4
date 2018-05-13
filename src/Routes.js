// import { syncHistoryWithStore } from "react-router-redux";
// import { createMemoryHistory } from "react-router";

import App from "./App";
import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";

// if (typeof window === "undefined") {
//   global.window = {};
// }

//console.log("browserHistory", browserHistory);
//const history = syncHistoryWithStore(browserHistory, store);

const Routes = [
  {
    component: App,
    routes: [
      {
        path: "/one",
        component: ComponentOne
      },
      {
        path: "/two",
        component: ComponentTwo
      }
    ]
  }
];

export default Routes;
