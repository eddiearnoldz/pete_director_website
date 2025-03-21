import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/art',
      name: 'art',
      component: () => import('../views/ArtView.vue')
    },
    {
      path: '/podcast-nscb',
      name: 'podcast-nscb',
      component: () => import('../views/PodcastView.vue')
    }
  ]
})

export default router
