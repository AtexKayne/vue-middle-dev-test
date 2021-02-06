import { createApp } from 'vue'
import App from './App.vue'
import TheHeader from './components/TheHeader'
import CardsList from './components/CardsList'
import './theme.css'

const app = createApp(App)

app.component('the-header', TheHeader)
app.component('cards-list', CardsList)

app.mount('#app')
