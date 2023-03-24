import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8083/smart-wifi"
  // baseURL: "http://172.27.242.113:8083/smart-wifi"
  // baseURL: "http://10.0.5.43:8083/smart-wifi"
  baseURL: "http://telzonewifi.telone.co.zw:8083/smart-wifi"
  // baseURL: "https://55a2-41-220-17-22.ap.ngrok.io/smart-wifi"
})