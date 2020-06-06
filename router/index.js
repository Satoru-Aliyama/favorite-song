import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue' 
import AddSmoothie from '@/views/AddSmoothie.vue'
import EditSmoothie from '@/views/EditSmoothie.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-favorite-songs',
    name: 'AddSmoothie',
    component: AddSmoothie,
  },
  {
    path: '/edit-favorite-songs/:song_slug',
    name: 'EditSmoothie',
    component: EditSmoothie,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
