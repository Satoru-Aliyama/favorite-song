import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import (/* webpackChunkName:"Index"*/ '@/views/Index.vue');
const AddSong = () => import (/* webpackChunkName:"AddSong"*/ '@/views/AddSong.vue');
const EditSong = () => import (/* webpackChunkName:"EditSong"*/ '@/views/EditSong.vue');


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-favorite-songs',
    name: 'AddSong',
    component: AddSong,
  },
  {
    path: '/edit-favorite-songs/:song_slug',
    name: 'EditSong',
    component: EditSong,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
