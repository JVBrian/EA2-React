import React, { useState, useEffect } from 'react';
import { getUsuario, postUsuario, putUsuario } from '../../services/usuarioService';
import { UsuarioTable } from './UsuarioTable';
import Swal from 'sweetalert2';

export const UsuarioView = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '', email = '' } = valoresForm;

  useEffect(() => {
    if (usuario) {
      setValoresForm(usuario);
    } else {
      setValoresForm({});
    }
  }, [usuario, setValoresForm]);

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsiteClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getUsuario();
      setUsuarios(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoUsuario = async (data) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (usuario) {
        const resp = await putUsuario(usuario._id, data);
        console.log(resp.data);
      } else {
        const resp = await postUsuario(data);
        console.log(resp.data);
      }

      listarUsuarios();
      setValoresForm({ name: '', estado: '', email: '' });
      setUsuario(null);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    nuevoUsuario(valoresForm);
  }

  const handleActionEdit = (resp) => {
    setUsuario(u => resp);
  }

  const handleCancelEdit = () => {
    setUsuario(null);
  }

  useEffect(() => { listarUsuarios(); }, []);

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title"> Editar Usuario </h5>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className='col'></div>
          </div>
          <div className='row'>
            <div className='col'></div>
            <form onSubmit={(e) => handleCrearUsuario(e)}>
              <div className='row'>
                <div className="col-lg-4">
                  <label className="form-label">Nombre</label>
                  <input required name='nombre' value={nombre} type="text" className="form-control"
                    placeholder="Escriba un nombre" onChange={(e) => handleOnChange(e)} />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Email</label>
                  <input required name='email' value={email} type="email" className="form-control"
                    placeholder="Escriba un email" onChange={(e) => handleOnChange(e)} />
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
            <UsuarioTable usuarios={usuarios} handleActionEdit={handleActionEdit} />
          </div>
        </div>
      </div>
    </div>
  )
}
