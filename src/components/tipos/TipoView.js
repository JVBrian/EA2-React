import React, { useState, useEffect } from 'react';
import { getTipoEquipo, postTipoEquipo, putTipoEquipo } from '../../services/tipoEquipoService';
import { TipoTable } from './TipoTable';
import Swal from 'sweetalert2';

export const TipoView = () => {

  const [tipos, setTipos] = useState([]);
  const [tipo, setTipo] = useState(null);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  useEffect(() => {
    if (tipo) {
      setValoresForm(tipo);
    } else {
      setValoresForm({});
    }
  }, [tipo, setValoresForm]);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsiteClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipoEquipo();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoTipo = async (data) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (tipo) {
        const resp = await putTipoEquipo(tipo._id, data);
        console.log(resp.data);
      } else {
        const resp = await postTipoEquipo(data);
        console.log(resp.data);
      }

      listarTipos();
      setValoresForm({ name: '', estado: '' });
      setTipo(null);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleCrearTipo = (e) => {
    e.preventDefault();
    nuevoTipo(valoresForm);
  }

  const handleActionEdit = (resp) => {
    setTipo(u => resp);
    console.log(setValoresForm);
  }

  const handleCancelEdit = () => {
    setTipo(null);
  }

  useEffect(() => { listarTipos(); }, []);

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title"> Editar Tipo Equipo </h5>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className='col'></div>
          </div>
          <div className='row'>
            <div className='col'></div>
            <form onSubmit={(e) => handleCrearTipo(e)}>
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
            <TipoTable tipos={tipos} handleActionEdit={handleActionEdit} />
          </div>
        </div>
      </div>
    </div>
  )
}
