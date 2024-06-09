import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/pages/Home.vue'
import ProfileView from '@/pages/Profile.vue'
import LogInView from '@/pages/LogIn.vue'
import OptionsView from '@/pages/Options.vue'

const routes = [
    { path : "/", component : HomeView},
    { path : "/profile", component : ProfileView },
    { path : "/login", component : LogInView },
    { path : "/options", component : OptionsView }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes : routes
})

export default router