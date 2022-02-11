import React from "react";
import Clientes from "./admin/Clientes";
import { Route, Routes } from "react-router-dom";
import Inicio from "./Inicio";
import ClienteFormulario from "./admin/ClienteFormulario";

export const Content = () => {
  return (
    <main className="container is-fluid">
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/cliente/:id" element={<ClienteFormulario/>}/>
      </Routes>
    </main>
  );
};


