import axios from "axios";
import { deviceId, fcmToken } from "../src/screens/HomeScreens/HomeScreen";


const instance = axios.create()

const getDeviceKey = ()=>{
    console.log("instance_helper : getDeviceKey: " , fcmToken);

    return deviceId;
}

const getFcmToken = ()=>{
    console.log("instance_helper : getFcmToken: " , fcmToken);
    return fcmToken;
}



instance.interceptors.request.use(function (request) {


    request.headers['deviceKey'] =  getDeviceKey();
    request.headers['fcm-token'] =  getFcmToken;
    

    return request;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default instance;