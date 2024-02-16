import { useAuthStore } from '~/store/auth'
import { useProfileStore } from "~/store/profile"
import { usePlanStore } from "~/store/plan"

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: { 
            authStore: useAuthStore(),
            profileStore: useProfileStore(),
            planStore: usePlanStore()
        },
    }
})