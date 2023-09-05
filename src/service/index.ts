import myAxios from "./request"
import { BASE_URL } from "./config"

const axios = new myAxios({
  baseURL: BASE_URL,
  timeout: 10000
})

export default axios
