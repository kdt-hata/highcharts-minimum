import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import brokenAxis from 'highcharts/modules/broken-axis'
brokenAxis(Highcharts)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(HighchartsVue)

app.mount('#app')
