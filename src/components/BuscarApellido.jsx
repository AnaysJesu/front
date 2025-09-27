import React, { useState } from "react";
import axios from "axios";

export default function BuscarApellido() {
  const [apellido, setApellido] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (!apellido) return alert("Ingrese un apellido");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pacientes/buscar/${apellido}`);
      setResultados(res.data);
    } catch (err) {
      console.error(err);
      alert("Error en búsqueda");
    }
  };

  return (
    <div className="buscar mt-4">
      <h2>Buscar por Apellido</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese apellido"
        />
        <button onClick={handleBuscar} className="btn btn-primary">Buscar</button>
      </div>

      {resultados.length > 0 ? (
        <div className="row">
          {resultados.map((p) => (
            <div className="col-md-6 mb-3" key={p.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{p.nombres} {p.apellidos}</h5>
                  <p className="card-text">
                    <strong>Rut:</strong> {p.rut}<br />
                    <strong>Dirección:</strong> {p.direccion}<br />
                    <strong>Ciudad:</strong> {p.ciudad}<br />
                    <strong>Teléfono:</strong> {p.telefono}<br />
                    <strong>Email:</strong> {p.email}<br />
                    <strong>Fecha Nacimiento:</strong> {new Date(p.fecha_nacimiento).toLocaleDateString()}<br />
                    <strong>Estado Civil:</strong> {p.estado_civil}<br />
                    <strong>Comentarios:</strong> {p.comentarios}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay resultados</p>
      )}
    </div>
  );
}
