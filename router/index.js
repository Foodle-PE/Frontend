import {createRouter, createWebHistory} from "vue-router";
import SignInView from '../src/authorization/pages/login-content.component.vue'
import SignUpView from '../src/authorization/pages/sign-up.component.vue'
import HomeView from '../src/authorization/pages/home.component.vue'

const inventoryMenu = () => import('../src/inventory/components/inventory.table.component.vue')
const alertsMenu = () => import('../src/alerts/components/alerta-list.component.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: SignInView
        },

        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpView
        },

        {
            path: '/home',
            name:'home',
            component: HomeView,

        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/inventory',
            name: 'inventory',
            component: inventoryMenu
        },
        {
            path: '/alerts',
            name: 'alerts',
            component: alertsMenu
        }

    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/sign-up'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');

    if (authRequired && !token) {
        return next('/login');
    }

    next();
});
export default router;
