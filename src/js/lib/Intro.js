

import Barba from "barba.js";
import anime from "animejs";

module.exports = class{
	
	constructor(){

		let Init = function(){
			let slider_init = false;
			

		 	let loadingOver = document.getElementById("loading-wrapper");
            let slide_switch = 1;
            let slide01 = document.querySelector("#slide01");

			if(loadingOver){
				
			
				let heroSlider =  document.getElementById('hero--slider');
				if(heroSlider){
                    let regexp = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
                    let heroEn = document.querySelector('.hero--catch__en')
                    if(heroEn){
                        let en_str = heroEn.textContent.split("");
                        let str = "";
                        for (let i = 0; i < en_str.length; i++) {
                            str += "<span class='hero__str'>" + en_str[i] + "</span>";
                        }
                        heroEn.innerHTML = str;
                    }

                    let heroJa = document.querySelector('.hero--catch__ja')
                    if(heroJa){
                        let ja_str = heroJa.textContent.split("");
                        let str = "";
                        for (let i = 0; i < ja_str.length; i++) {
                            if(regexp.test(ja_str[i])){
                                str += "<span class='hero__str hero__str-sm'>" + ja_str[i] + "</span>";
                            }else{
                                str += "<span class='hero__str'>" + ja_str[i] + "</span>";
                            }
                        }
                        heroJa.innerHTML = str;
                    }

					let loop = function (){
						let Timeline = anime.timeline({
							loop: true,
                            duration: 4000,
                            delaty:4000,
							easing: 'easeInOutExpo'
						})
						Timeline
						.add({
							targets:'#hero--slider #slide01',
							opacity: [1,0],
                        })
						.add({
							targets:'#hero--slider #slide02',
							opacity: [1,0],
						})
						.add({
							targets:'#hero--slider #slide03',
							opacity: [1,0],
						})
					}
               
					setTimeout(function(){
						if(!slider_init){
							let str_animation =  anime.timeline();
							str_animation.add({
								targets : "#catch01 .hero--catch__en .hero__str",
								translateY: function(el, i) {
								    let s = anime.random(-30,30) ;
								    return [s,1];
								},
								// translateX: function(el, i) {
								//     let s =  anime.random(-20,20) ;
								//     return [s,1];
								// },
								opacity:[0,1],
								easing: "easeInOutExpo",
								delay: function(el, i) {
                                    return (i * 40);
                                },
								duration:1300
							})
							.add({
								targets : "#catch01 .hero--catch__ja .hero__str",
								
								translateY: function(el, i) {
								    let s =  anime.random(-10,10) ;
								    return [s,1];
								},
								
								opacity:[0,1],
								easing: "easeInOutExpo",
								delay: function(el, i) {
								    return (i * 40);
								},
								offset:"-=1300",
								duration:1300,
								complete:function(){
									slider_init = true;
									loop();
								}
							})
						}
					},200)
				}

			}
		}

		Barba.Dispatcher.on('transitionStart', Init);
	}	
};