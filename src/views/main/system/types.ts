export interface IMenu {
  id: number
  key: number
  url: string
  name: string
  sort: number
  type: number
  children: any[]
  createAt: string
  parentId: number
  updateAt: string
}
