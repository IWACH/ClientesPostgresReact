import * as Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const ClienteFormulario = () => {
  const navigate = useNavigate();
  const notify = (message) =>
    toast.warn(message, {
      toastId: message,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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

  const save = (nombre, apellido) => {
    if (isNew) {
      Axios.post("/api/cliente", { nombre, apellido, fecnac }).then(
        (response) => {
          navigate("/clientes");
        }
      );
    } else {
      Axios.put(`/api/cliente/${id}`, { nombre, apellido, fecnac }).then(
        (response) => {
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

  const emptyInput = (name, lastName) => {
    if (nombre === "" || apellido === "" || fecnac === "") {
      return true;
    } else if (name.length === 0 || lastName.length === 0) {
      return true;
    }
  };

  const dateInput = () => {
    if (
      moment(fecnac) > moment() ||
      moment(fecnac) < moment().subtract(100, "years")
    ) {
      return true;
    }
  };

  const validationData = () => {
    const name = nombre.trim();
    const lastName = apellido.trim();
    if (emptyInput(name, lastName)) {
      return notify("Todos los datos son requeridos.");
    } else if (dateInput()) {
      return notify("Fecha incorrecta.");
    } else {
      save(name, lastName);
    }
  };

  const inputValidation = (setIdentifierState, event) => {
    const { value } = event.target;
    let regex = new RegExp("^[a-zA-Z ]+$");
    if (regex.test(value) || value === "") {
      setIdentifierState(value);
    } else {
      return notify("No se permiten caracteres especiales.");
    }
  };

  return (
    <div>
      <ToastContainer limit={0} />
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
                  onChange={(e) => inputValidation(setNombre, e)}
                  placeholder="Nombre"
                />
              </div>
              <div className="is-flex is-flex-direction-row mt-4">
                <span className="is-align-self-center mr-4">Apellido: </span>
                <input
                  className="input"
                  type="text"
                  value={apellido}
                  onChange={(e) => inputValidation(setApellido, e)}
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
                <button className="button is-success" onClick={validationData}>
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
