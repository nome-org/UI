import axios from "axios";

import { BASE_URL } from "./constants";


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL ?? BASE_URL,
    validateStatus: status => {
        return status >= 200 && status < 600;
    },
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})



export default instance;