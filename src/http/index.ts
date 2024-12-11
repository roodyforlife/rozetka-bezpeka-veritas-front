import axios from 'axios';
import { REACT_APP_API_URL } from '../consts';

const axiosConfig = {
    baseURL: REACT_APP_API_URL
};

const $host = axios.create(axiosConfig);

export {
    $host
};