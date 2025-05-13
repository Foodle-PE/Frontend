import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import './style.css'

import { PrimeVue } from '@primevue/core'
import Material from '@primeuix/themes/material'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'


import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'


import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Password from "primevue/password";
import Divider from 'primevue/divider'

import {createPinia} from "pinia";
const pinia = createPinia();


const app = createApp(App)



app.use(PrimeVue, {
    theme: { preset: Material },
    ripple: true
    })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .use(pinia)
    .component('pv-button', Button)
    .component('pv-input-text', InputText)
    .component('pv-checkbox', Checkbox)
    .component('pv-toast', Toast)
    .component('pv-dialog', Dialog)
    .component('pv-InputGroup', InputGroup)
    .component('pv-InputGroupAddon', InputGroupAddon)
    .component('pv-password', Password)
    .component('pv-divider', Divider)
app.use(router)
app.mount('#app')
