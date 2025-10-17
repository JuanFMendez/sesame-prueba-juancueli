import axios from 'axios'

//generamos una instancia de axios para reutilizar en los servicios y no tener que repetir codigo
//cada peticion con axios incluye el token y la url base
const TOKEN = import.meta.env.VITE_API_TOKEN
const REGION = import.meta.env.VITE_API_REGION
const API_BASE_TEMPLATE = import.meta.env.VITE_API_BASE

//la url base cambia segun la region que se configure en el fichero .env modificando un valor rastreable como : APIREGIONMOD
const API_BASE = API_BASE_TEMPLATE.replace('APIREGIONMOD', REGION)

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
})
