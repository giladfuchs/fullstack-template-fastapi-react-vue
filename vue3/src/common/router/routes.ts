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
      component: () => import('@/views/apps/AGTable.vue')
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
      name: 'add_edit',
      path: ':model/:url',
      component: () => import('@/views/components/form/Form.vue')
    }
  ]
};
export { AuthRoutes, PublicRoutes };
