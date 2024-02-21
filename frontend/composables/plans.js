import { useHeaders } from "~/composables/header";
import {useResponsehandler} from '~/composables/responseHandler'
const { getHeaders } = useHeaders();
const {handleSucceess} = useResponsehandler();
export const usePlans = () => {
    const plans = ref([]);
    const plan =ref([]);

    const getPlans = async () => {
        const res= await $fetch(`/api/plans`, {
            method: 'get',
            headers: await getHeaders()
        })
        await handleSucceess(res)

        plans.value = res;

        return plans;
    }
    const buyPlan = async (price, user) => {
        plan.value = [];
        const res = await $fetch(`/api/buy/plan`, {
            method: 'post',
            body:{
                price_id: price,
                user_id: user
            },
            headers: await getHeaders()
        });

        await handleSucceess(res)
        plan.value = res;
        return plan;
    }

    return { plans, plan, getPlans,buyPlan }
}