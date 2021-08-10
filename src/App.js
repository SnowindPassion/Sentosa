import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import store from "./store";
import { CurrencyProvider } from "./context/CurrencyProvider";

import BiggestMoversPage from "./pages/BiggestMovers";
import ConvertPage from "./pages/ConvertPage";
import HistoryPage from "./pages/HistoryPage";
import TopMenu from "./elements/TopMenu";

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <TopMenu />
          <Provider store={store}>
            <CurrencyProvider>
              <Switch>
                <Route path="/BiggestMovers">
                  <BiggestMoversPage />
                </Route>
                <Route path="/History">
                  <HistoryPage />
                </Route>
                <Route path="/Convert">
                  <ConvertPage />
                </Route>
                <Route path="/">
                  <Redirect to="/BiggestMovers" />
                </Route>
              </Switch>
            </CurrencyProvider>
          </Provider>
      </Router>
    );
  }
}
