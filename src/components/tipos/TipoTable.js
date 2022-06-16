import React from 'react'
import moment from 'moment'

export const TipoTable = ({ tipos, handleActionEdit}) => {
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
                        tipos.map(tipo => {
                            return <tr key={tipo._id}>
                                <td>{tipo.name}</td>
                                <td>{tipo.estado}</td>
                                <td>{moment(tipo.fechaCreacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>{moment(tipo.fechaActualizacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>
                                    <button
                                        onClick={() => handleActionEdit(tipo)}
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
