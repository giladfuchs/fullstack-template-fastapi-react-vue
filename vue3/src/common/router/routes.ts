import type { RouteLocationNormalized } from 'vue-router';
import { ModelType } from '@/common/types';

const AuthRoutes = {
  path: '',
  meta: {
    requiresAuth: true
  },
  redirect: `/${ModelType.student}`,
  component: () => import('@/assets/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'main_table',
      path: ':model',
      component: () => import('@/views/apps/AGTable.vue'),
      beforeEnter: (to: RouteLocationNormalized) =>
        [ModelType.student].includes(to.params.model as ModelType) ? true : { path: '/error', replace: true }
    },

    {
      name: 'view',
      path: 'student/view/:id',
      component: () => import('@/views/apps/StudentView.vue')
    }
  ]
};
const PublicRoutes = {
  path: '/',
  component: () => import('@/assets/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/apps/Login.vue')
    },

    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/components/shared/Error.vue')
    },
    {
      name: 'add_edit',
      path: ':model/:url',
      component: () => import('@/views/components/form/Form.vue'),
      beforeEnter: (to: RouteLocationNormalized) =>
        Object.values(ModelType).includes(to.params.model as ModelType) ? true : { path: '/error', replace: true }
    }
  ]
};
export { AuthRoutes, PublicRoutes };
