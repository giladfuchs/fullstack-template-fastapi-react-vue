import { createRouter, createWebHistory } from 'vue-router';
import { AuthRoutes, PublicRoutes } from './routes';
import { useAuthStore } from '@/common/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/apps/Login.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/components/shared/Error.vue')
    },
    ...[PublicRoutes],
    ...[AuthRoutes]
  ],
  linkActiveClass: 'active'
});

router.beforeEach(async (to, from, next) => {
  const auth_store: any = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth_store.authenticated) {
      next('login');
    } else next();
  } else next();
});
