import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from '../store/loggedInUser'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/landing.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { publicOnly: true },
    component: () => import('../views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/home.vue')
  },
  {
    path: '/clientform',
    name: 'clientform',
    meta: {
      requiresAuth: true,
      requiresEditor: true
    },
    component: () => import('../views/clientform.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    meta: { requiresAuth: true },
    component: () => import('../views/findclient.vue')
  },
  {
    path: '/clientdetails/:id',
    name: 'clientdetails',
    meta: { requiresAuth: true },
    component: () => import('../views/clientdetails.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    meta: {
      requiresAuth: true,
      requiresEditor: true
    },
    component: () => import('../views/eventform.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    meta: { requiresAuth: true },
    component: () => import('../views/findevents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    meta: { requiresAuth: true },
    component: () => import('../views/eventdetails.vue')
  },
  {
    path: '/serviceform',
    name: 'serviceform',
    meta: {
      requiresAuth: true,
      requiresEditor: true
    },
    component: () => import('../views/serviceform.vue')
  },
  {
    path: '/findservice',
    name: 'findservice',
    meta: { requiresAuth: true },
    component: () => import('../views/findservice.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    meta: { requiresAuth: true },
    component: () => import('../views/servicedetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // Makes anchor links on the landing page work properly.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    return {
      top: 0
    }
  }
})

// Protect routes
router.beforeEach((to) => {
  const store = useLoggedInUserStore()

  // Not logged in -> login page
  if (
    to.meta.requiresAuth &&
    !store.isLoggedIn
  ) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  // Already logged in -> don't show login page again
  if (
    to.meta.publicOnly &&
    store.isLoggedIn
  ) {
    return {
      path: '/dashboard'
    }
  }

  // Viewer trying to access an editor-only page
  if (
    to.meta.requiresEditor &&
    store.role !== 'editor'
  ) {
    return {
      path: '/dashboard'
    }
  }
})

export default router