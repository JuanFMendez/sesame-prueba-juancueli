export class Alerta {
  message: string
  visible: boolean
  tipo: 'error' | 'success'

  constructor(message: string = '') {
    this.message = message
    this.visible = true
    this.tipo = 'error'
  }
  cerrar() {
    this.visible = false
  }
}
