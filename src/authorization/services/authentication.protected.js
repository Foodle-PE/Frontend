import {useAuthenticationStore} from "./authentication.store.js";

export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = ['/login', '/sign-up', '/profiles', '/page-not-found'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);

    if (isAnonymous && routeRequiresToBeAuthenticated) return next('/login');
    else next();
}