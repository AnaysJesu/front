import React from "react";
import FichaForm from "./components/FichaForm";
import BuscarApellido from "./components/BuscarApellido";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <div className="container mt-4">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h1>Ficha Médica</h1>
        <img src="/logo.jpeg" alt="Logo" style={{ width: "80px" }} />
      </div>

      <FichaForm />
      <BuscarApellido />
    </div>
  );
}
