
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
            refreshFsLightbox();
        }
    }
}