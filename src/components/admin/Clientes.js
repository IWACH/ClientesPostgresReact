import { map } from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Axios from "axios";
import moment from "moment";

const Clientes = () => {
  const [clientesData, setClientesData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    Axios.get("/api/clientes").then((response) => {
      setClientesData(response.data);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <div className="content">
        <h2>Mantenimiento de clientes</h2>
        {loading ? (
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        ) : null}
        {loading === false ? (
          <div className="table-container is-hidden-mobile">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha de nacimiento</th>
                  <th>Edad</th>
                  <td>
                    <Link
                      className="button is-primary is-small is-pulled-right"
                      to="/cliente/new"
                    >
                      Crear
                    </Link>
                  </td>
                </tr>
              </thead>
              <tbody>
                {map(clientesData, (cliente, ix) => {
                  return (
                    <tr key={ix}>
                      <th>{cliente.id}</th>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.apellido} </td>
                      <td>{moment(cliente.fecnac).format("DD-MM-YYYY")}</td>
                      <td>{cliente.edad}</td>
                      <td>
                        <Link
                          className="button is-small is-pulled-right"
                          to={`/cliente/${cliente.id}`}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-edit"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {loading === false ? (
          <div className="is-hidden-desktop is-hidden-tablet">
            <Link className="button is-primary is-fullwidth" to="/cliente/new">
              Crear
            </Link>
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha Nacimiento</th>
                </tr>
              </thead>
              <tbody>
                {map(clientesData, (cliente, ix) => {
                  return (
                    <tr key={ix}>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.apellido} </td>
                      <td>
                        <div className="is-flex is-justify-content-space-around">
                          {moment(cliente.fecnac).format("DD-MM-YYYY")}

                          <Link
                            className="button is-small is-pulled-right"
                            to={`/cliente/${cliente.id}`}
                          >
                            <span className="icon is-small">
                              <i className="fas fa-edit"></i>
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Clientes;
