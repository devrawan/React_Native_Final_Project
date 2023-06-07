import axios from "axios";
import { deviceId, fcmToken } from "../App";


const instance = axios.create()

instance.interceptors.request.use(function (request) {


    request.headers['deviceKey'] =  deviceId;
    request.headers['fcm-token'] =  fcmToken;
    

    return request;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default instance;