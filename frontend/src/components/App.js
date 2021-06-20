import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./todos/Todos";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import TodoProvider from "../context/todoContext";
import ModalProvider from "../context/modalContext";

const App = () => {
  return (
    <TodoProvider>
      <ModalProvider>
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
      </ModalProvider>
    </TodoProvider>
  );
};

export default App;
