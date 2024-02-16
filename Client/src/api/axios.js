import axios from 'axios';

import Cookie from 'js-cookie';

const cookies = Cookie.get();

console.log('token', cookies.token)

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    headers: { Authorization : `Bearer ${cookies.token}`}
})

export default instance;