require("import-export");
require("babel-register")({ presets: ["es2015", "react"] });

const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const react = require("react");

// Redux
const redux = require("redux");
const reactRedux = require("react-redux");
const reducers = require("../src/reducers").default;

const reactDomServer = require("react-dom/server");
const reactRouter = require("react-router");
const ReactRouterConfig = require("react-router-config");

//const createMemoryHistory = require("react-router").createMemoryHistory;
const reactRouterRedux = require("react-router-redux");

const thunk = require("redux-thunk").default;

const renderToString = reactDomServer.renderToString;
const StaticRouter = reactRouter.StaticRouter;
const Route = reactRouter.Route;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const Provider = reactRedux.Provider;

const matchRoutes = ReactRouterConfig.matchRoutes;
const renderRoutes = ReactRouterConfig.renderRoutes;

const syncHistoryWithStore = reactRouterRedux.syncHistoryWithStore;

const staticFiles = [
  "/static/*",
  "/logo.svg",
  "/asset-manifest.json",
  "/favicon.ico"
];

//console.log("reducers", reducers);

const app = express();

app.server = http.createServer(app);

app.use(express.static("../build"));

staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, "../build", req.url);
    res.sendFile(filePath);
  });
});

// app.get(handleRender);

// function handleRender (req, res) {

// }
const routes = require("../src/Routes").default;
const store = createStore(reducers, applyMiddleware(thunk));

const loadBranchData = location => {
  const branch = matchRoutes(routes, location);

  const promises = branch.map(({ route, match }) => {
    return route.loadData ? route.loadData(match) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

app.get("*", (req, res) => {
  const htmlFilePath = path.join(__dirname, "../build", "index.html");
  fs.readFile(htmlFilePath, "utf8", (err, htmlData) => {
    if (err) {
      error();
    } else {
      //console.log("routes", routes);
      return loadBranchData(req.url).then(data => {
        let context = {};

        const sr = react.createElement(
          StaticRouter,
          { location: req.url, context: context },
          renderRoutes(routes)
        );
        const pr = react.createElement(Provider, { store: store }, sr);
        const content = renderToString(pr);
        if (context.status === 404) {
          res.status(404);
        }
        //console.log("store.getState()", store.getState());
        const preloadedState = JSON.stringify(store.getState()).replace(
          /</g,
          "\\u003c"
        );

        const html = htmlData.replace("{{SSR}}", content).replace(
          "{{PS}}",
          // `<script dangerouslySetInnerHTML=${{ __html: initialState }} />`
          `<script>window.__INITIAL_STATE__ = ${preloadedState}</script>/>`
        );
        res.status(200).send(html);
      });
    }
  });
});

app.server.listen(process.env.PORT || 8080);
console.log(`Listening on http://localhost:${app.server.address().port}`);
