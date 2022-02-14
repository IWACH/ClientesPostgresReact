import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAdmin, setopenAdmin] = useState(false);
  return (
    <nav
      className="navbar header"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          FULL STACK{" "}
        </Link>

        <a
          role="button"
          className={openMenu ? "navbar-burger is-active" : "navbar-burger"}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={openMenu ? "navbar-menu is-active" : "navbar-menu"}
        onClick={() => setOpenMenu(false)}
      >
        <div className="navbar-end">
          <div className="navbar-item" onClick={()=> setopenAdmin(!openAdmin)}>
            <div className={openAdmin ? "navbar-item has-dropdown is-active" : "navbar-item has-dropdown"}>
              
                <a className="navbar-link">Admin</a>

                <div className="navbar-dropdown is-right">
                  <Link
                    className="navbar-item"
                    to="/"
                    onClick={() => setopenAdmin(!openAdmin)}
                  >
                    Inicio
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/clientes"
                    onClick={() => setopenAdmin(!openAdmin)}
                  >
                    Clientes
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
