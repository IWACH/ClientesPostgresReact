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
  const [validacion, setValidacion] = useState(false);

  useEffect(() => {
    if (!isNew) {
      Axios.get(`/api/cliente/${id}`).then((response) => {
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setFecNac(moment(response.data.fecnac).format("YYYY-MM-DD"));
      });
    }
  }, [isNew, id]);

  useEffect(() => {
    if (validacion === true) {
      setTimeout(()=>setValidacion(false), 5000);
    }
  }, [validacion]);

  const save = () => {
    if (isNew) {
      Axios.post("/api/cliente", { nombre, apellido, fecnac }).then(
        (response) => {
          navigate("/clientes");
        }
      );
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

  const validation = () => {
    if (nombre === "" || apellido === "" || fecnac === "") {
      setValidacion(true);
    }
  };

  return (
    <div>
      {console.log(fecnac)}
      {validacion ? (
        <div className="notification is-danger is-light">
          <button
            className="delete"
            onClick={() => setValidacion(false)}
          ></button>
          Completar correctamente los campos requeridos
        </div>
      ) : null}
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
              ) : (
                <div />
              )}

              <div className="buttons">
                <Link className="button" to="/clientes">
                  Cancelar
                </Link>
                <button
                  className="button is-success"
                  onClick={() => {
                    validation();
                    save();
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default ClienteFormulario;
