

import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch';
import Prevent from "./Prevent"
import PageTransition from "./PageTransition"
const pageTransition = new PageTransition

export default class{
	
	constructor(){
        let display_loading = true;
        if(process.env.MIX_DISP_LOADING == "false" && process.env.NODE_ENV == "development"){
            display_loading = false;
        }
        barba.use(barbaPrefetch);
        barba.init({
            preventRunning: true,
            prevent: Prevent,
            timeout: 10000,
            cacheIgnore: ['/contact/','/entry/'],
            views: [
                {
                    namespace: 'not-loading',
                    beforeEnter(data) {
                        pageTransition.mask.style.visibility = 'hidden' 
                        display_loading = false;
                    },
                    beforeLeave(data) {
                        pageTransition.mask.style.visibility = 'visible'
                        display_loading = true;
                    },
                },
            ],
            transitions: [{

                // apply only when leaving `[data-barba-namespace="home"]`
                // from: 'home',

                // apply only when transitioning to `[data-barba-namespace="products | contact"]`
                // to: {
                //     namespace: [
                //         'products',
                //         'contact'
                //     ]
                // },
            
                // apply only if clicked link contains `.cta`
                // custom: ({ current, next, trigger })
                // => trigger.classList && trigger.classList.contains('cta'),

                // do leave and enter concurrently
                sync: true,
                
                async beforeOnce(data) {
                    if(display_loading){
                        await pageTransition.beforeOnce(data)       
                    }
                },
                async once(data) {
                    if(display_loading){
                        await pageTransition.once(data)
                    }
                },
                async afterOnce(data) {
                    if(display_loading){
                        await pageTransition.afterOnce(data)
                    }
                },
                async beforeLeave(data) {
                    if(display_loading){
                        await pageTransition.beforeLeave(data)
                    }
                },
                async leave(data) {
                    if(display_loading){
                        await pageTransition.leave(data)
                    }
                },
                async afterLeave(data) {
                    if(display_loading){
                        await pageTransition.afterLeave(data)
                    }
                },
                async beforeEnter(data) {
                    if(display_loading){
                        await pageTransition.beforeEnter(data)
                    }
                },
                async enter(data) {
                    if(display_loading){
                        await pageTransition.enter(data)
                    }
                },
                async afterEnter(data) {
                    if(display_loading){
                        await pageTransition.afterEnter(data)
                    }
                },
                async after(data) {
                    if(display_loading){
                        await pageTransition.after(data)
                    }
                }
            }]
        }); 
	}
}