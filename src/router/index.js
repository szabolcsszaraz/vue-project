import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import JobDetailView from '@/views/JobDetailView.vue'
import NewJobView from '@/views/NewJobView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/job/:id',
      name: 'job-detail',
      component: JobDetailView,
      props: true
    },
    {
      path: '/new-job/:id?',
      name: 'new-job',
      component: NewJobView,
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ],
})

export default router
