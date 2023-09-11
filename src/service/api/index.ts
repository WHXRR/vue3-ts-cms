
import * as loginApi from "./login/login"
import * as systemApi from "./system/system"

export default {
  ...loginApi,
  ...systemApi
}
