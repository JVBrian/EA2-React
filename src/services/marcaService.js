import { axiosInstance } from "../helpers/axios-config";

const getMarca = () => {
    return axiosInstance.get('marca', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const postMarca = (data) => {
    const resp = axiosInstance.post('marca', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const putMarca = (marcaId, data) => {
    const resp = axiosInstance.put(`marca/${marcaId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getMarca,
    postMarca,
    putMarca
}