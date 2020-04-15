
import barba from '@barba/core';
import anime from 'animejs';

export default class{

	constructor(){
        this.drawerLinks = []
        this.opened = false

        this.opening_class = 'drawer-opening'
        this.opened_class = 'drawer-opened'
        this.closing_class = 'drawer-closing'
        
        this.hamburger_id = "#js-hamburger"
        this.drawer_id = "#js-drawer"
        this.drawer_link_class = ".l-drawer__nav--link"
        this.drawer_str_class = ".l-drawer__nav--str"

        barba.hooks.once((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }

    init(){
        this.body = document.body;
        this.hamburger = document.querySelector(this.hamburger_id);
        this.drawer = document.querySelector(this.drawer_id);
        if(this.drawer){
            this.drawerLinks = this.drawer.querySelectorAll(this.drawer_link_class);
            if(this.hamburger){
                this.hamburger.addEventListener('click',(e) => {
                    this.drawerClick(e);
                })
            }
            if(this.drawerLinks){
                if( this.drawerLinks.length > 0 ){
                    this.drawerLinks.forEach( (drawerLink) => {
                        this.drawerRemoveClass(drawerLink)
                    });
                }
            }
            
        }
        
    }
    drawerClick(e){
            
        this.drawerToggleClass();
    }
    drawerToggleClass(){
        if(!this.opened){
           this.open();
            
        }else{
            this.close();
        }
    }
    drawerRemoveClass(drawerLink){
        drawerLink.addEventListener('click',() =>{
            setTimeout(() =>{
                this.close();
            },300)
        })
    } 
    open(){
        this.body.classList.add(this.opening_class);
        this.body.classList.add(this.opened_class);
        anime({
            targets:this.drawer_str_class,
            translateY:['100%',0],
            easing: 'easeInOutSine',
            duration:500,
            delay:function(el,i){
                return i * 30;
            }
        })
        this.opened = true;

    }
    close (){
        this.body.classList.remove(this.opening_class);
        this.body.classList.add(this.closing_class);
        setTimeout(() =>{
            this.drawer.scrollTo(0,0)
            this.body.classList.remove(this.closing_class);
            this.body.classList.remove(this.opened_class);
            this.body.classList.remove(this.opening_class);
            this.opened = false;
        },300)
    }
}