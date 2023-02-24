import axios from "axios"

export default axios.create({
    baseURL: 'http://telzonewifi.telone.co.zw:8082/api'
})