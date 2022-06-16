import React from 'react'
import moment from 'moment'

export const EstadoTable = ({ estados, handleActionEdit }) => {
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
                        estados.map(estado => {
                            return <tr key={estado._id}>
                                <td>{estado.name}</td>
                                <td>{estado.estado}</td>
                                <td>{moment(estado.fechaCreacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>{moment(estado.fechaActualizacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>
                                    <button
                                        onClick={() => handleActionEdit(estado)}
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
