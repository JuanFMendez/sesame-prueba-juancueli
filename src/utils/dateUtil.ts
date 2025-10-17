export function formatearFecha(dateString?: string): string {

  //si no incluye fecha mostramos por defecto
  if (!dateString){
    return 'No disponible'
  } 

  const diaSeleccionado = new Date(dateString)
  const hoy = new Date()

  //recuperamos fechas a comparar
  const dateSelected = new Date(diaSeleccionado.getFullYear(), diaSeleccionado.getMonth(), diaSeleccionado.getDate())
  const today = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  //comparamos diferencia de dias
  const diffTime = today.getTime() - dateSelected.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  //mensaje personalziado para los 2 primeros dias
  if (diffDays === 0){
    return 'Hoy'
  } 
  if (diffDays === 1){
    return 'Ayer'
  } 
  
  //resto de dias
  return diffDays + ' días'
} 
