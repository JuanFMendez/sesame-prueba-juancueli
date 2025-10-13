import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    //pagina inicial
    path: '/', 
    name: 'Home',
    component: Home, 
  },
 { 
    //redireccion a la pagina inicial
    path: '/:pathMatch(.*)*', 
    redirect: '/',            
  },
  
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
