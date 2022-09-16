import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/authentication',
    name: 'authentication',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */ '@/pages/authentication.vue'
      )
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "index" */ '@/layout/defaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "index" */ '@/pages/index.vue')
      }
    ]
  },
  {
    path: '/stock-manager',
    component: () =>
      import(
        /* webpackChunkName: "stock-manager" */ '@/layout/stockManagerLayout.vue'
      ),
    children: [
      {
        path: '',
        name: 'online-offline',
        component: () =>
          import(
            /* webpackChunkName: "stock-manager" */ '@/pages/stockManager/index.vue'
          )
      },
      {
        path: 'online',
        name: 'online',
        component: () =>
          import(
            /* webpackChunkName: "stock-manager" */ '@/pages/stockManager/online/index.vue'
          )
      },
      {
        path: 'offline',
        name: 'offline',
        component: () =>
          import(
            /* webpackChunkName: "stock-manager" */ '@/pages/stockManager/offline/index.vue'
          )
      },
      {
        path: 'order',
        name: 'order',
        component: () =>
          import(
            /* webpackChunkName: "stock-manager" */ '@/pages/stockManager/order/index.vue'
          )
      }
    ]
  },
  {
    path: '/register',
    component: () =>
      import(
        /* webpackChunkName: "offline-register" */ '@/layout/registerLayout.vue'
      ),
    children: [
      {
        path: '',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "offline-register" */ '@/pages/register/index.vue'
          )
      },
      {
        path: 'online/qr-reader',
        name: 'online-receipt-qr-reader',
        component: () =>
          import(
            /* webpackChunkName: "offline-register" */ '@/pages/register/online/qrReaderView.vue'
          )
      },
      {
        // path: 'online/confirmation',
        path: 'online/confirmation/:purchaseId',
        name: 'online-confirm-receipt',
        component: () =>
          import(
            /* webpackChunkName: "offline-register" */ '@/pages/register/online/receiptConfirmationView.vue'
          ),
        props: route => ({ purchaseId: Number(route.params.id) })
      },
      {
        path: 'online/done',
        name: 'online-receipt-done',
        component: () =>
          import(
            /* webpackChunkName: "offline-register" */ '@/pages/register/online/receiptDoneView.vue'
          )
      },
      {
        path: 'offline',
        name: 'offline-register',
        component: () =>
          import(
            /* webpackChunkName: "offline-register" */ '@/pages/register/offline/posView.vue'
          )
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundError',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '@/pages/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
