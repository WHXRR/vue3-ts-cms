type IFormType = 'input' | 'select' | 'datePicker' | 'radio'

export interface IFormItems {
  type: IFormType
  label: string
  name: string
  rules?: any[]
  options?: any
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
  colStyle?: IColStyle
  formLabelCol?: any
}
