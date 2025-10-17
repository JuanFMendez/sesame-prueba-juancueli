export interface MenuItem {
  title: string
  open?: boolean
  active?: boolean
  icon?: any
  children?: MenuItem[]
}
