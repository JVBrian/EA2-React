import React from 'react'
import { Link } from 'react-router-dom';

export const InventarioCard = (props) => {
  const { inventario } = props;

  return (
    <div className="col">
      <div className="card">
        <img src={inventario.foto} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Características</h5>
          <hr />
          <p className="card-text">{`Serial: ${inventario.serial}`}</p>
          <p className="card-text">{`Estado: ${inventario.marca.estado}`}</p>
          <p className="card-text">{`Usuario: ${inventario.usuario.email}`}</p>
          <p className="card-text">
            <Link to={`inventario/edit/${inventario._id}`}>Ver más...</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
