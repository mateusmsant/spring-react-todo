import React from "react";

const Footer = () => {
  const data =
    '{ frontend: "React", backend: "Spring", author: "github.com/mateusmsant" }';
  return (
    <div>
      <footer className="footer">
        <span className="text-muted">
          <code>{`this.getData() = ${data}`}</code>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
