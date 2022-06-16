import { axiosInstance } from "../helpers/axios-config";

const getUsuario = () => {
    return axiosInstance.get('usuario', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const postUsuario = (data) => {
    const resp = axiosInstance.post('usuario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const putUsuario = (usuarioId, data) => {
    const resp = axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getUsuario,
    postUsuario,
    putUsuario
}