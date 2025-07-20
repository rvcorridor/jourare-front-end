import {createRouter, createWebHistory} from "vue-router";
import HomeView from '@/pages/Home.vue'
import Feed from "@/pages/Feed.vue"
import ProfileView from '@/pages/Profile.vue'
import LogInView from '@/pages/LogIn.vue'
import OptionsView from '@/pages/Options.vue'
import Messages from "@/pages/profile-pages/Messages.vue";
import Journals from "@/pages/profile-pages/Journals.vue";
import Statuses from "@/pages/profile-pages/Statuses.vue";
import Thread from "@/pages/profile-pages/components/Thread.vue";
import Followers from "@/pages/profile-pages/Followers.vue";
import Status from "@/pages/feed-components/Status.vue";
import MessagesWrapper from "@/pages/profile-pages/MessagesWrapper.vue";
import SingularThread from "@/pages/profile-pages/SingularThread.vue";

const routes = [
    { path : "/", component : HomeView, name : "home"},
    { path : "/login", component : LogInView, name : "login"},
    { path : "/options", component : OptionsView, name : "options" },
    { path : "/:id([0-9]+)", component : ProfileView },
    { path : "/:username([0-9A-z]+)", name: "profile", component : ProfileView,
        children : [
            {path : 'messages/', component : MessagesWrapper, children : [
                    {path: ':threadID([0-9]+)', name: "thread", component : SingularThread},
                    {path: '', name: "messages", component : Messages}
                ]
            },
            {path : 'journals', name : "journals", component : Journals},
            {path : 'statuses', name : "statuses", component : Statuses,
                children : [{
                    path: ":statusID([0-9]+)",
                    name: "statusPost",
                    component: Status
                }]},
            {path : 'followers', name : "followers", component : Followers},
        ]
    },
    { path : "/feed", component : Feed }
]

const router = createRouter({
    history: createWebHistory(),
    routes : routes
})

export default router