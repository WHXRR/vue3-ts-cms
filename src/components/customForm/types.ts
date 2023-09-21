import type { ComputedRef } from 'vue'
type IFormType = 'input' | 'select' | 'datePicker' | 'radio' | 'password'

export interface IFormItems {
  filed: string
  type: IFormType
  label: string
  name?: string
  rules?: any[]
  options?: any
  hidden?: boolean
}

export interface IColStyle {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface IForm {
  formItems: IFormItems[]
  formName: string
  colStyle?: IColStyle
  formLabelCol?: any
  submitBtnText?: string | ComputedRef<string>
  fixed?: boolean
  showCollapsed?: boolean
  showResetBtn?: boolean
  showSubmitBtn?: boolean
}
