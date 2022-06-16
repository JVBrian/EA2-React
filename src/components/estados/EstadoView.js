import React, { useState, useEffect } from 'react';
import { getEstadoEquipo, postEstadoEquipo, putEstadoEquipo } from '../../services/estadoEquipoService';
import { EstadoTable } from './EstadoTable';
import Swal from 'sweetalert2';

export const EstadoView = () => {

  const [estados, setEstados] = useState([]);
  const [estadoE, setEstadoE] = useState(null);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  useEffect(() => {
    if (estadoE) {
      setValoresForm(estadoE);
    } else {
      setValoresForm({});
    }
  }, [estadoE, setValoresForm]);

  const listarEstados = async () => {
    try {
      Swal.fire({
        allowOutsiteClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getEstadoEquipo();
      setEstados(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoEstado = async (data) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (estadoE) {
        const resp = await putEstadoEquipo(estadoE._id, data);
        console.log(resp.data);
      } else {
        const resp = await postEstadoEquipo(data);
        console.log(resp.data);
      }

      listarEstados();
      setValoresForm({ name: '', estado: '' });
      setEstadoE(null);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleCrearEstado = (e) => {
    e.preventDefault();
    nuevoEstado(valoresForm);
  }

  const handleActionEdit = (resp) => {
    setEstadoE(u => resp);
    console.log(setValoresForm);
  }

  const handleCancelEdit = () => {
    setEstadoE(null);
  }

  useEffect(() => { listarEstados(); }, []);

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title"> Editar Estado Equipo </h5>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className='col'></div>
          </div>
          <div className='row'>
            <div className='col'></div>
            <form onSubmit={(e) => handleCrearEstado(e)}>
              <div className='row'>
                <div className="col-lg-8">
                  <label className="form-label">Nombre</label>
                  <input required name='nombre' value={nombre} type="text" className="form-control"
                    placeholder="Escriba un nombre" onChange={(e) => handleOnChange(e)} />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Estado</label>
                  <select required name='estado' value={estado}
                    className="form-select" onChange={(e) => handleOnChange(e)}>
                    <option defaultValue value="">--SELECCIONAR--</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="row mb-5 mt-3">
                <div className="col">
                  <button type='submit' className="btn btn-primary custom-button">Guardar</button>
                  <button type='button' onClick={handleCancelEdit} className='btn btn-secondary'>Cancelar</button>
                </div>
              </div>
            </form>
            <EstadoTable estados={estados} handleActionEdit={handleActionEdit} />
          </div>
        </div>
      </div>
    </div>
  )
}
