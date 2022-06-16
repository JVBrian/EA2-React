import React, { useState, useEffect } from 'react'
import { getUsuario } from '../../services/usuarioService';
import { getMarca } from '../../services/marcaService';
import { getTipoEquipo } from '../../services/tipoEquipoService';
import { getEstadoEquipo } from '../../services/estadoEquipoService';
import { postInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';


export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [valoresForm, setValoresForm] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', fechaCompra = '', precio = '', usuario, marca, tipo, estado } = valoresForm;

    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuario();
            setUsuarios(data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarUsuarios();
    }, []);


    const listarMarcas = async () => {
        try {
            const { data } = await getMarca();
            setMarcas(data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarMarcas();
    }, []);


    const listarTipos = async () => {
        try {
            const { data } = await getTipoEquipo();
            setTipos(data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarTipos();
    }, []);


    const listarEstados = async () => {
        try {
            const { data } = await getEstadoEquipo();
            setEstados(data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEstados();
    }, []);


    const handleOnChange = ({ target }) => {

        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread

    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio, usuario: { _id: usuario }, marca: { _id: marca }, tipoEquipo: { _id: tipo }, estadoEquipo: { _id: estado }
        }

        try {
            Swal.fire({
                allowOutsiteClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await postInventario(inventario);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarInventarios();
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, por favor intente de nuevo';
            }
            Swal.fire('Error', mensaje , 'error');
        }

    }

    return (
        <div className='sidebar'>
            <div className='conteiner-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo inventario</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' value={serial} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" name='modelo' value={modelo} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <input type="text" name='descripcion' value={descripcion} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input type="text" name='color' value={color} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="url" name='foto' value={foto} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Compra</label>
                                <input type="date" name='fechaCompra' value={fechaCompra} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input type="number" name='precio' value={precio} onChange={(e) => handleOnChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select" name='usuario' value={usuario} onChange={(e) => handleOnChange(e)} required>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        usuarios.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>
                                                {name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select className="form-select" name='marca' value={marca} onChange={(e) => handleOnChange(e)} required>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        marcas.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>
                                                {name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo</label>
                                <select className="form-select" name='tipo' value={tipo} onChange={(e) => handleOnChange(e)} required>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        tipos.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>
                                                {name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado</label>
                                <select className="form-select" name='estado' value={estado} onChange={(e) => handleOnChange(e)} required>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        estados.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>
                                                {name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-secondary'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
