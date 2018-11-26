
import axios from "axios"
const baseUrl = "http://192.168.1.101:3000";

export default {
  get: (url, params) => {


    let option = {
      url: baseUrl + url,
      method: "GET",
      params: params,
      headers: { "user-id": 8 }
    }

    return axios(option)
  }
} 