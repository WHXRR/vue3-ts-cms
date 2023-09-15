
import * as loginApi from "./login/login"
import * as systemApi from "./system/system"
import * as productApi from "./product/goods"

export default {
  ...loginApi,
  ...systemApi,
  ...productApi
}
