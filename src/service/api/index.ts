
import * as loginApi from "./login"
import * as systemApi from "./system"
import * as productApi from "./product"
import * as analysisApi from "./analysis"

export default {
  ...loginApi,
  ...systemApi,
  ...productApi,
  ...analysisApi
}
