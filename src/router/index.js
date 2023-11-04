import {createWebHistory, createRouter} from "vue-router";


const routes = [
    {
        path: "/inscribe",
        name: "Home",
        component: () => import("@/pages/Home/index.vue")
    },
    {
        path: "/member",
        name: "Member",
        component: () => import("@/pages/Member/index.vue")
    },
]



const router = createRouter({
    routes,
    history: createWebHistory()
})


export default router;