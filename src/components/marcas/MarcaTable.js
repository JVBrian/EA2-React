import React from 'react'
import moment from 'moment'

export const MarcaTable = ({ marcas, handleActionEdit }) => {
    return (
        <div className="scrollme">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Fecha de Actualización</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        marcas.map(marca => {
                            return <tr key={marca._id}>
                                <td>{marca.name}</td>
                                <td>{marca.estado}</td>
                                <td>{moment(marca.fechaCreacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>{moment(marca.fechaActualizacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>
                                    <button
                                        onClick={() => handleActionEdit(marca)}
                                        className='btn btn-success btn-sm'>Editar</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
