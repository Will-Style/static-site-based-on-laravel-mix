
import barba from '@barba/core';

export default class{

	constructor(){
        barba.hooks.once((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }
    init (){
        require('fslightbox');
        if(typeof refreshFsLightbox === "function"){

            const blogBodyImage = document.querySelectorAll('.c-blog__single--body a[href$=".jpg"],.c-blog__single--body a[href$=".jpeg"],.c-blog__single--body a[href$=".gif"],.c-blog__single--body a[href$=".png"]') 
            if(blogBodyImage.length > 0){
                blogBodyImage.forEach( (img) => {
                    img.setAttribute('data-fslightbox', 'gallery')
                })
            }
        
            refreshFsLightbox();
        }
    }
}