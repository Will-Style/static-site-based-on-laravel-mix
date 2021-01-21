

import barba from '@barba/core';
import ScrollTrigger from '@terwanerik/scrolltrigger'
import anime from 'animejs';


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

        const strAnimations = document.querySelectorAll('[data-trigger="translateY"]')
        if(strAnimations.length > 0 ){
            strAnimations.forEach((el) => {
                let _str = el.textContent.split("");
                let str = "";
                _str.map( s => {
                    str += "<span class='str__animation'>" + s  + "</span>";
                })
                    
                el.innerHTML = str;
            })
        }

        this.trigger.add('[data-trigger="translateY"]',
            { 
                once: true,
                offset: {
                    viewport: {
                        y: (trigger, frame, direction) => {
                            return trigger.visible ? 0 : .1
                        }
                    }
                },
                toggle: {
                    callback: {
                        in: (trigger) => {
                            
                            const strs = trigger.element.querySelectorAll('span');

                            anime({
                                targets: strs,
                                translateX:['10%',0],
                                easing: 'easeOutSine',
                                duration: 800,
                                scale: [1.4,1],
                                opacity:[0,1],
                                delay: function(el, i) { return i * 20 }
                            });
            
                        }
                    }
                }
            },
        )
    }
}