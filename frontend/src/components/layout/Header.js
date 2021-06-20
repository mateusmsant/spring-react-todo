import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark text-center">
          <Link to="/" className="link">
            <h3>Tarefas</h3>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
