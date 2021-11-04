import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

createApp(App).mount('#app')
