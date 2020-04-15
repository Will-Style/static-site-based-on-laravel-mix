
import barba from '@barba/core';
import Swiper from "swiper";

export default class{

	constructor(){

        barba.hooks.beforeOnce((data) => {
            this.heroSlider()
            this.blogSlider()

        })
        barba.hooks.after((data) => {
            this.heroSlider()
            this.blogSlider()
        });
        
    }
    
    heroSlider(){
        new Swiper ('#hero--slider', {
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
        const blogSlider = new Swiper('.blog-slider', {
            
            navigation:  {
                nextEl: '.blog-slider .swiper-button-next',
                prevEl: '.blog-slider .swiper-button-prev',
            },
            pagination: {
                el: '.blog-slider .swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass  + '"></span>';
                }
            },
            // on: {
            //     transitionStart(){
            //         const	self = this;
            //         for(let i = 0; i <  blog_thumbnails.length; i++){
            //             blog_thumbnails[i].classList.remove('active');
            //             blog_thumbnails[self.realIndex].classList.add('active');
            //         }
            //     }
            // },
            // preloadImages: false,
            // lazy: {
            //     loadPrevNext: true,
            // },
            loop : true
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
}