import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { requireAuth: false}
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
    meta: { requireAuth: false}
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/org',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/org/index'),
        meta: { title: 'Organizations', icon: 'component', requireAuth: true}
      }
    ],
    hidden: true
  },

  {
    path: '/org',
    component: Layout,
    children: [
      {
        path: '',
        name: 'org',
        component: () => import('@/views/org/index'),
        meta: { title: 'Organizations', icon: 'component', affix: true, requireAuth: true}
      }
    ]
  },

  {
    path: '/site',
    component: Layout,
    children: [
      {
        path: '',
        name: 'site',
        component: () => import('@/views/site/index'),
        meta: { title: 'Sites', icon: 'site', affix: true, requireAuth: true}
      }
    ]
  },

  {
    path: '/model',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'model',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Device Models', icon: 'tree-table', requireAuth: true }
      }
    ]
  },
  {
    path: '/phone',
    component: Layout,
    meta: { title: 'Phones', icon: 'el-icon-phone' },
    children: [
      {
        path: 'index',
        name: 'table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Phone Table', icon: 'el-icon-phone', requireAuth: true }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/phones/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel', requireAuth: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history' // Required for Adal library
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
