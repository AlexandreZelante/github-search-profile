import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
