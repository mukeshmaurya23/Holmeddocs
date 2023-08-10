import React from "react";
import store from "./store/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SnackbarProvider } from "notistack";

import ScrollToTop from "./util/ScrollToTop";
import DummyTest from "./components/pages/Appointment/DummyTest";
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SnackbarProvider maxSnack={3}>
          <ScrollToTop />
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
