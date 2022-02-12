import React, { useState, useEffect } from "react";
import { map } from "lodash";

import * as Axios from "axios";
import moment from "moment";

const Inicio = () => {
  const [clientesData, setClientesData] = useState([]);
  const [promedioEdad, setPromedioEdad] = useState(0);

  useEffect(() => {
    Axios.get("/api/clientes").then((response) => {
      setClientesData(response.data);
    });

    Axios.get("/api/clientes/promedio-edad").then((response) => {
      setPromedioEdad(response.data.promedio);
    });
  }, []);

  return (
    <div className="inicio is-flex is-flex-direction-column">
      <div className="is-flex is-flex-direction-column ">
        <div className="title is-align-self-center">LISTA DE CLIENTES</div>
        {promedioEdad ? (
          <div>
            <span className="subtitle">Edad promedio: </span>
            <span className="tag is-success tag-age mb-4">
              {Math.round(promedioEdad * 10) / 10}
            </span>
          </div>
        ) : null}
      </div>

      <div className="columns is-multiline is-mobile">
        {map(clientesData, (cliente, ix) => {
          return (
            <div className="column" key={ix}>
              <div className="card cards">
                <div className="card-content content">
                  <div className="is-flex is-flex-direction-row">
                    <div className="tag-name is-flex is-align-items-center is-justify-content-center">
                      <span className="">S</span>
                    </div>
                    <div className="">
                      <span className="title is-4">{cliente.nombre}</span>
                      <br />
                      <span className="subtitle is-6">{cliente.apellido}</span>
                    </div>
                  </div>

                  <div className="content">
                    <div><i class="fa-solid fa-cake-candles mr-3"></i>{moment(cliente.fecnac).format("DD/MM/YYYY")}</div>
                    <div>Edad: {cliente.edad}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inicio;
