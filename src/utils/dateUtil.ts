import { useI18n } from 'vue-i18n'

export function formatearFecha(dateString?: string): string {

  const { t } = useI18n() 

  // si no incluye fecha mostramos por defecto
  if (!dateString) {
    return t('date.notAvailable') 
  } 

  const diaSeleccionado = new Date(dateString)
  const hoy = new Date()

  // recuperamos fechas a comparar
  const dateSelected = new Date(diaSeleccionado.getFullYear(), diaSeleccionado.getMonth(), diaSeleccionado.getDate())
  const today = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  // comparamos diferencia de días
  const diffTime = today.getTime() - dateSelected.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // mensaje personalizado para los 2 primeros días
  if (diffDays === 0) {
    return t('date.today') 
  } 
  if (diffDays === 1) {
    return t('date.yesterday') 
  } 

  // resto de días
  return t('date.daysAgo', { count: diffDays }) 
}
