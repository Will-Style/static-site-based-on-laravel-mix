

import barba from '@barba/core';

export default class{

	constructor(){

        barba.hooks.beforeOnce((data) => {
            this.window()
        })
        barba.hooks.beforeEnter((data) => {
            this.window()
        });
    }
    
    window(){
        this.windowOpens = document.querySelectorAll('[data-window-open]');
        this.windowCloses = document.querySelectorAll('[data-window-close]');

        if(this.windowOpens.length > 0){
            this.windowOpens.forEach((wo) => {
                this.open(wo, "ExWindow",650,800);
            })
        }
        if(this.windowCloses.length > 0){
            this.windowCloses.forEach((wc) => {
                this.close(wc);
            })
        }
    }
    open (el,name,width,height){
        if(el){
            let _name = (el.getAttribute('data-name')) ? el.getAttribute('data-name') : name;
            let _width = (el.getAttribute('data-width')) ? el.getAttribute('data-width') : width;
            let _height = (el.getAttribute('data-height')) ? el.getAttribute('data-height') : height;

            let x = (el.getAttribute('data-x')) ? el.getAttribute('data-x') : 60;
            let y = (el.getAttribute('data-y')) ? el.getAttribute('data-y') : 60;
            el.addEventListener('click',(e) => {
                e.preventDefault();
                window.open(el.href, _name,'width='+_width+', height='+_height+',left='+x+', top='+y+', menubar=no, toolbar=no, scrollbars=yes'); return false;
            },false);
        }
    }
    close (el){
        el.addEventListener('click',(e) => {
            window.open('about:blank','_self').close()
        },false);
    }

}