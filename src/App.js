import React from "react";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Defination from "./component/Defination";
import GenerateTestcase from "./component/GenerateTestcase";
import Introduction from "./component/Introduction";
import Characteristic from "./component/Characteristic";
import Homepage from "./component/Homepage";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Homepage />
        </Route>
        <Route path="/Characteristic">
          <Characteristic />
        </Route>
        <Route path="/GenerateTestcase">
          <GenerateTestcase />
        </Route>
        <Route path="/Defination">
          <Defination />
        </Route>
        <Route path="/Introduction">
          <Introduction />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}