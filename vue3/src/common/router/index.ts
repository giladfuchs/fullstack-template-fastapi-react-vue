import { createRouter, createWebHistory } from 'vue-router';
import { AuthRoutes, PublicRoutes } from './routes';
import { useAuthStore } from '@/common/stores/auth';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'error' }
    },
    ...[PublicRoutes],
    ...[AuthRoutes]
  ],
  linkActiveClass: 'active'
});

router.beforeEach(async (to, from, next) => {
  const auth_store = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth_store.authenticated) {
      next('login');
    } else next();
  } else next();
});
