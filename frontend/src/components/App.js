import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoList from "./todos/TodoList";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" component={TodoList} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
