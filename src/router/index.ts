import { createRouter, createWebHistory } from 'vue-router'
import HomeViewTestRouter from '../views/HomeViewTestRouter.vue'

const routes = [
  {
    //pagina inicial
    path: '/', 
    name: 'Home',
    component: HomeViewTestRouter, 
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
