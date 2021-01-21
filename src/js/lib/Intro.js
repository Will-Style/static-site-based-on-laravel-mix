
import barba from '@barba/core';
import anime from 'animejs';

export default class{

	constructor(){
        barba.hooks.afterOnce((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }
    init (){
       const heroCatch = document.querySelector("#hero--catch")
        if(heroCatch){
            let regexp = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
            let heroPrimary = document.querySelectorAll('.hero-catch__row')
            if(heroPrimary.length > 0){
                heroPrimary.forEach( (h,i) => {
                    let pr_str = h.textContent.split("");
                    let str = "";
                    pr_str.map( s => {
                        str += "<span class='hero__str'>" + s  + "</span>";
                    })
                        
                    h.innerHTML = str;
                })
            }

            let heroSecondary = document.querySelectorAll('.hero--catch__secondary')
            if(heroSecondary){
                heroSecondary.forEach( (h,i) => {
                    let sc_str = h.textContent.split("");
                    let str = "";
                    sc_str.map( s => {
                        str += "<span class='hero__str'>" + s  + "</span>";
                    })
                        
                    h.innerHTML = str;
                })
            }

            
    
            setTimeout(function(){
                let str_animation =  anime.timeline();
                str_animation.add({
                    targets : '#hero--image',
                    scale: [1.1,1],
                    translateX: ["10%",0],
                    opacity:[0,1],
                    easing: "easeOutExpo",
                    duration:2000
                })
                str_animation.add({
                    targets : '.hero--catch__primary .hero__str',
                    scale: [1.3,1],
                    translateX: ["20%",0],
                    opacity:[0,1],
                    // translateX: function(el, i) {
                    //     let s =  anime.random(-20,20) ;
                    //     return [s,0];
                    // },
                    easing: "easeOutExpo",
                    delay: function(el, i) {
                        return (i * 30);
                    },
                    duration:2000
                },"-=1300")
                .add({
                    targets : '.hero--catch__secondary .hero__str',
                    
                    scale: [1.3,1],
                    translateX: ["20%",0],
                    opacity:[0,1],
                    
                    easing: "easeOutExpo",
                    delay: function(el, i) {
                        return (i * 30);
                    },
                    duration:800
                },"-=2000")
                .add({
                    targets : '.hero--catch__button',
                    
                    translateX: ["20%",0],
                    scale: [1.3,1],
                    opacity:[0,1],
                    
                    easing: "easeOutExpo",
                    duration:800
                },"-=2000")
            },600)
       }
    }
}