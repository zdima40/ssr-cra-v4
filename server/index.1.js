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
const counterApp = require("./reducers");

const reactDomServer = require("react-dom/server");
const reactRouter = require("react-router");

const renderToString = reactDomServer.renderToString;
const match = reactRouter.match;
const RouterContext = reactRouter.RouterContext;

const createStore = redux.createStore;
const Provider = reactRedux.Provider;

const staticFiles = [
  "/static/*",
  "/logo.svg",
  "/asset-manifest.json",
  "/favicon.ico"
];

const routes = require("../src/Routes").default();

const app = express();
app.server = http.createServer(app);
app.use(express.static("../build"));

staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, "../build", req.url);
    res.sendFile(filePath);
  });
});

app.get("*", (req, res) => {
  // Create a new Redux store instance
  const store = createStore(counterApp);

  const error = () => res.status(404).send("404");
  const htmlFilePath = path.join(__dirname, "../build", "index.html");

  fs.readFile(htmlFilePath, "utf8", (err, htmlData) => {
    if (err) {
      error();
    } else {
      match(
        { routes, location: req.url },
        (err, redirectLocation, renderProps) => {
          if (err) {
            res.status(500).send(error.message);
          } else if (redirectLocation) {
            res.redirect(
              302,
              redirectLocation.pathname + redirectLocation.search
            );
          } else if (renderProps) {
            // Render the component to a string
            const ReactApp = renderToString(
              //react.createElement(RouterContext, renderProps)
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            );

            // Grab the initial state from our Redux store
            const preloadedState = store.getState();

            const html = htmlData.replace("{{SSR}}", ReactApp);

            // Send the rendered page back to the client
            res.send(renderFullPage(html, preloadedState));

            res.status(200).send(RenderedApp);
          } else {
            error();
          }
        }
      );
    }
  });
});

app.server.listen(process.env.PORT || 8080);
console.log(`Listening on http://localhost:${app.server.address().port}`);
