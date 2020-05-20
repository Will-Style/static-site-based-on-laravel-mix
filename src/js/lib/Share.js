

import barba from '@barba/core';

export default class{

	constructor(){

        barba.hooks.beforeOnce((data) => {
            this.share()
        })
        barba.hooks.beforeEnter((data) => {
            this.share()
        });
    }
    
    share(){
        this.shareTws = document.querySelectorAll('[data-share-tw]');
        this.shareFbs = document.querySelectorAll('[data-share-fb]');

        if(this.shareTws.length > 0){
            this.shareTws.forEach((tw) => {
                this.open(tw, "TWwindow",650,300);
            })
        }
        if(this.shareFbs.length > 0){
            this.shareFbs.forEach((fb) => {
                this.open(fb, "FBwindow",650,450);
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
            },true);
        }
    }

}