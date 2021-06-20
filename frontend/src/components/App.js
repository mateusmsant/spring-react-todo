import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./todos/Todos";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const App = () => {
  return (
    <div className="main">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Todos} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
