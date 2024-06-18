import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/pages/Home.vue'
import ProfileView from '@/pages/Profile.vue'
import LogInView from '@/pages/LogIn.vue'
import OptionsView from '@/pages/Options.vue'
import Messages from "@/pages/profile-pages/Messages.vue";
import Journals from "@/pages/profile-pages/Journals.vue";
import Statuses from "@/pages/profile-pages/Statuses.vue";
import Thread from "@/pages/profile-pages/components/Thread.vue";

const routes = [
    { path : "/", component : HomeView},
    { path : "/login", component : LogInView },
    { path : "/options", component : OptionsView },
    { path : "/:id([0-9]+)", component : ProfileView },
    { path : "/:username([0-9A-z]+)", name: "profile", component : ProfileView,
        children : [
            {path : 'messages', name : "messages", component : Messages,
                children : [{
                        path: "messageID([0-9]+)",
                        name: "thread",
                        component : Thread
                    }]
            },
            {path : 'journals', name : "journals", component : Journals},
            {path : 'statuses', name : "statuses", component : Statuses}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes : routes
})

export default router