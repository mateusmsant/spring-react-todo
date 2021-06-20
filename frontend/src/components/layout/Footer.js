import React from "react";

const Footer = () => {
  const tech = '{ frontend: "React", backend: "Spring" }';
  return (
    <div>
      <footer
        className="footer"
        onClick={() => console.log(window.innerHeight)}
      >
        <code>{`this.getTech() = ${tech}`}</code>
      </footer>
    </div>
  );
};

export default Footer;
