export class Alerta {
  message: string
  visible: boolean
  tipo: 'success' | 'error'

  constructor(message: string = '') {
    this.message = message
    this.visible = true
    this.tipo = 'success'
  }
  cerrar() {
    this.visible = false
  }
}
