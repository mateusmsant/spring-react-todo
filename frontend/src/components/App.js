import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./todos/Todos";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import TodoProvider from "../context/todoContext";

const App = () => {
  return (
    <TodoProvider>
      <div className="main">
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" component={Todos} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </TodoProvider>
  );
};

export default App;
