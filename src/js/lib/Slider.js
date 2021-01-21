
import barba from '@barba/core';
import Swiper from 'swiper';

export default class{

	constructor(){

        barba.hooks.beforeOnce((data) => {
            this.heroSlider()
            this.blogSlider()
            this.pickupSlider()
            this.eventSlider()

        })
        barba.hooks.after((data) => {
            this.heroSlider()
            this.blogSlider()
            this.pickupSlider()
            this.eventSlider()
        });
        
    }
    
    heroSlider(){
        new Swiper ('#hero--slider',{
            loop: true,
            effect :'fade',
            speed:3000,
            allowTouchMove :false,
            simulateTouch:false,
            autoplay: {
                delay: 4000
            }
        })
    }
    
    blogSlider(){
        // const blog_thumbnails = document.querySelectorAll('.blog-slider-thumbnails a');
        const blogSlider = new Swiper('.js-blog__slider', {
            loop: true,
            speed:400,
            easing:"linear",
            loopAdditionalSlides : 5,
            slidesPerView: 'auto',
            spaceBetween: 20,
            simulateTouch:true,
            centeredSlides: false,
            breakpoints: {
                
                576: {
                    slidesPerView: 'auto',
                    spaceBetween:  40,
                }
            }
        });
        
        // const blogThumbnailAddEvent = (el,i) => {
        //     el.addEventListener('click',function(e){
        //         e.preventDefault();
        //         blogSlider.slideTo(i+1);
        //     })
        // }

        // for(var i = 0; i <  blog_thumbnails.length; i++){
        //     blogThumbnailAddEvent( blog_thumbnails[i],i);
        // }
    }
    pickupSlider(){
        const pickup = new Swiper('.js-pickup--slider', {
            loop: true,
            speed:400,
            easing:"linear",
            loopAdditionalSlides : 5,
            slidesPerView: 'auto',
            spaceBetween: 20,
            simulateTouch:true,
            centeredSlides: false,
            breakpoints: {
                
                576: {
                    slidesPerView: 'auto',
                    spaceBetween:  40,
                }
            }
        })
    }
    eventSlider(){
        const SliderContentClass = '.js-event__slider--content'
        const SliderImageClass = '.js-event__slider--images'
        const SliderContentNav = document.querySelector(SliderContentClass + ' .swiper--nav')
        const slides = document.querySelectorAll(SliderImageClass + ' .swiper-slide');
        if(slides.length > 1){

            const EventImageSlider = new Swiper(SliderImageClass, {
                effect:'fade',
                speed:1500,
                easing: "easeInOutExpo",
                loop : true
            });
            const EventContentSlider = new Swiper(SliderContentClass, {
                effect:'slide',
                navigation:  {
                    nextEl: SliderContentClass + ' .swiper-button-next',
                    prevEl: SliderContentClass + ' .swiper-button-prev',
                },
                
                easing: "easeOutExpo",
                speed:1000,
                loop : true,
                on: {
                    init: function () {
                        SliderContentNav.innerText = 1 + '/' + slides.length
                    },
                    slideChange: function () {
                        SliderContentNav.innerText = (EventContentSlider.realIndex + 1) + '/' + slides.length
                    },
                },
            });

            EventImageSlider.controller.control = EventContentSlider;
            EventContentSlider.controller.control = EventImageSlider;
            EventContentSlider
        }
    }
}