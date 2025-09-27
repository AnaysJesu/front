import React, { useState } from "react";
import axios from "axios";

export default function FichaForm() {
  const [formData, setFormData] = useState({
    rut: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
    fecha_nacimiento: "",
    estado_civil: "",
    comentarios: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/pacientes", formData);
      alert("Paciente guardado con éxito: " + res.data.nombres);
      handleClear();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  const handleClear = () => {
    setFormData({
      rut: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      ciudad: "",
      telefono: "",
      email: "",
      fecha_nacimiento: "",
      estado_civil: "",
      comentarios: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      {Object.keys(formData).map((key) => {
        if (key === "comentarios") {
          return (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <textarea className="form-control" id={key} value={formData[key]} onChange={handleChange} />
            </div>
          );
        } else if (key === "estado_civil") {
          return (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label">Estado Civil</label>
              <select className="form-select" id={key} value={formData[key]} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Viudo">Viudo</option>
                <option value="Divorciado">Divorciado</option>
              </select>
            </div>
          );
        } else {
          return (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={key === "email" ? "email" : key === "fecha_nacimiento" ? "date" : "text"}
                className="form-control"
                id={key}
                value={formData[key]}
                onChange={handleChange}
                required={["rut","nombres","apellidos","email","estado_civil"].includes(key)}
              />
            </div>
          );
        }
      })}

      <div className="mt-3">
        <button type="submit" className="btn btn-success me-2">Guardar</button>
        <button type="button" onClick={handleClear} className="btn btn-warning me-2">Limpiar</button>
        <button type="button" onClick={() => window.close()} className="btn btn-danger">Cerrar</button>
      </div>
    </form>
  );
}
