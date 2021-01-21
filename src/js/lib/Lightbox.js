
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

            const blogBodyImage = document.querySelectorAll(".c-blog__single--body a > img") 
            if(blogBodyImage.length > 0){
                blogBodyImage.forEach( (img) => {
                    img.parentElement.setAttribute('data-fslightbox', 'gallery')
                })
            }
        
            refreshFsLightbox();
        }
    }
}