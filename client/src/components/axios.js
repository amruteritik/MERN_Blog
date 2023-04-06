import axios from "axios";
import {BASE_URL} from "./helper"

const instance = axios.create({
    // baseURL : "http://localhost:9000",
    baseURL : BASE_URL,
});

export default instance;