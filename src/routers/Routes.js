import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "../components/Details";
import Home from "../components/Home";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default Routes;