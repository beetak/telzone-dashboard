import axios from "axios"

export default axios.create({
    // baseURL: 'http://telzonewifi.telone.co.zw:8084/api/meraki'
    baseURL: 'http://telzonewifi.telone.co.zw:8082/api'
    // baseURL: 'http://172.27.6.236:80/api/meraki'
})