import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create',
      name: 'create',
      component: () => import('/src/views/create/create.vue'),
      props: (route) => route.query,
      meta: {
        keepAlive: false,
      },
      async beforeEnter(to, form, next) {
        if (to.query.channelName && to.query.channelId) return next();
        next({
          name: 'select-create-props',
          query: to.query,
        });
      },
    },
    {
      path: '/my-reservation',
      name: 'my-reservation',
      component: () => import('/src/views/my-reservation/my-reservation.vue'),
      props: (route) => route.query,
      meta: {
        keepAlive: false,
      },
    },
  ],
});
export default router;
