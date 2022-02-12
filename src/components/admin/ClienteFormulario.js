import * as Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const ClienteFormulario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new";
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecnac, setFecNac] = useState("");

  useEffect(() => {
    if (!isNew) {
      Axios.get(`/api/cliente/${id}`).then((response) => {
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setFecNac(moment(response.data.fecnac).format("YYYY-MM-DD"));
      });
    }
  }, [isNew, id]);

  const save = () => {
    if (isNew) {
      Axios.post("/api/cliente", { nombre, apellido, fecnac }).then((response) => {
        console.log("CAMBIOOO", fecnac);
        navigate("/clientes");
      });
    } else {
      Axios.put(`/api/cliente/${id}`, { nombre, apellido, fecnac }).then(
        (response) => {
          console.log(fecnac);
          navigate("/clientes");
        }
      );
    }
  };

  const remove = () => {
    Axios.delete(`/api/cliente/${id}`, { nombre, apellido, fecnac }).then(
      (response) => {
        navigate("/clientes");
      }
    );
  };

  return (
    <div className="box">
      <article>
        <header className="header title">
          {isNew ? "Crear Cliente" : "Editar Cliente"}
        </header>
        <section className="section">
          <div className="is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-row">
              <span className="is-align-self-center mr-4">Nombre: </span>
              <input
                className="input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div className="is-flex is-flex-direction-row mt-4">
              <span className="is-align-self-center mr-4">Apellido: </span>
              <input
                className="input"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apeliido"
              />
            </div>
            <div className="is-flex is-flex-direction-row mt-4">
              <span className="is-align-self-center mr-4">Nacimiento: </span>
              <input
                className="input"
                type="date"
                value={fecnac}
                onChange={(e) => setFecNac(e.target.value)}
                placeholder="DD/MM/AAAA"
              />
            </div>
          </div>
        </section>
        <footer>
          <div className="buttons is-flex is-justify-content-space-between">
            {!isNew ? (
              <button className="button is-danger" onClick={remove}>
                Delete
              </button>
            ) : <div/>}

            <div className="buttons">
              <Link className="button" to="/clientes">
                Cancelar
              </Link>
              <button className="button is-success" onClick={save}>
                Guardar
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ClienteFormulario;
