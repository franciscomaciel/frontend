import axios from 'axios';
const { 'token' : token } = parseToken();

function parseToken() {
    return { 'token' : 'COLOCAR TOKEN AQUI'};
}

export const api = axios.create({
    baseUrl: process.env.REACT_APP_CONNECTOR_BACKEND_URL
})

if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
