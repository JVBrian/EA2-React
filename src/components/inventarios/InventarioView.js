import React, { useState, useEffect } from 'react';
import { getInventario } from '../../services/inventarioService';
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';
import Swal from 'sweetalert2';

export const InventarioView = () => {

    const [inventarios, setInventarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listarInventarios = async () => {
        try {
            Swal.fire({
                allowOutsiteClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getInventario();
            console.log(data);
            setInventarios(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();   
        }
    }

    useEffect(() => {
        listarInventarios();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <div className='container-fluid'>
            <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    inventarios.map((inventario) => {
                        return <InventarioCard key={inventario._id} inventario={inventario} />
                    })
                }
            </div>
            {
                openModal ?
                    <InventarioNew handleOpenModal={handleOpenModal} listarInventarios={listarInventarios} />
                    :
                    (<button className='btn btn-success fab' onClick={handleOpenModal}>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </div>
    )
}
