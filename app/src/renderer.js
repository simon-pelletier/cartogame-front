import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import Reactotron from "./ReactotronConfig";
import rootReducer from "Reducers";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import App from "./App";
import "./ReactotronConfig";

const store = createStore(rootReducer, compose(Reactotron.createEnhancer()));

render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
