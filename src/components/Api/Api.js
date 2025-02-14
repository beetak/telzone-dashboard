import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5002/api/v1"
  // baseURL: "http://localhost:8083/smart-wifi"
  // baseURL: "http://172.27.6.189:8083/smart-wifi"
  // baseURL: "http://10.0.5.43:8083/smart-wifi"
  baseURL: "http://telzonewifi.telone.co.zw:8083/smart-wifi"
  // baseURL: "https://0046-41-60-115-14.ngrok-free.app/smart-wifi"
})