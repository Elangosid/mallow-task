import axios from 'axios';

const API_KEY = 'reqres-free-v1';

const headers = {
    'x-api-key': API_KEY,
};

const http = {
    get: async (url: string) => {
        const res = await axios.get(url, { headers });
        return res.data;
    },

    post: async (url: string, data: any) => {
        const res = await axios.post(url, data, { headers });
        return res;
    },

    put: async (url: string, data: any) => {
        const res = await axios.put(url, data, { headers });
        return res.data;
    },


    delete: async (url: string) => {
        const res = await axios.delete(url, { headers });
        return res.data;
    },
};

export default http;
