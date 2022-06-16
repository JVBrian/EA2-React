import React from 'react'
import moment from 'moment'

export const UsuarioTable = ({ usuarios, handleActionEdit }) => {
    return (
        <div className="scrollme">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Fecha de Actualización</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => {
                            return <tr key={usuario._id}>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.estado}</td>
                                <td>{moment(usuario.fechaCreacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>{moment(usuario.fechaActualizacion).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                <td>
                                    <button
                                        onClick={() => handleActionEdit(usuario)}
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
