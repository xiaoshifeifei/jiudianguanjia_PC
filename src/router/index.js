import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { intelligence } from './modules/intelligence'

export const composeRoutes = [
  ...intelligence
]

export const constantRoutes = [
  ...intelligence,
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
/*
 * composeRoutes
 * router.onError((error) => {
 *   const pattern = /Loading chunk (\d)+ failed/g
 *   const isChunkLoadFaild = error.message.match(pattern)
 *   const targetPath = router.history.pending.fullPath
 *   if (isChunkLoadFaild) {
 *     router.replace(targetPath)
 *   }
 * })
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
