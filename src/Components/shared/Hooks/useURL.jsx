import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
})

const useURL = () => {
    return axiosInstance
}

export default useURL;