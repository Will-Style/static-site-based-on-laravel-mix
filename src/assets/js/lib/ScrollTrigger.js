

import barba from '@barba/core';
import ScrollTrigger from '@terwanerik/scrolltrigger'


export default class{

	constructor(){
        barba.hooks.afterOnce((data) => {
            this.trigger = new ScrollTrigger()
            this.initailTrigger()
        });
        barba.hooks.leave((data) => {
            this.trigger.kill()
        });
        barba.hooks.after((data) => {
            this.trigger = new ScrollTrigger()
            this.initailTrigger()
        });

    }
    initailTrigger(){
        this.trigger.add('[data-trigger]', {
            once: true,
            offset: {
               
                viewport: {
                    x: 0,
                    y: (trigger, frame, direction) => {
                        return trigger.visible ? 0 : 0.3
                    }
                }
            },
            toggle: {
                // class: {
                //     in: 'visible',
                //     out: ['invisible', 'extraClassToToggleWhenHidden']
                // },
                // callback: {
                //     in: null,
                //     visible: null,
                //     out: (trigger) => {
                //         return new Promise((resolve, reject) => {
                //             setTimeout(resolve, 10)
                //         })
                //     }
                // }
            }
        })
    }
}