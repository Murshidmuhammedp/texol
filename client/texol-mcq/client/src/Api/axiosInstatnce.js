import axios from "axios";

const customAxios = axios.create({
    baseURL: "http://localhost:4001"
    // baseURL: "https://mcq-test-evhc.onrender.com"
});


export default customAxios;