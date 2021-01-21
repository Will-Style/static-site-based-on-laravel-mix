

import barba from '@barba/core';
import StickySidebar from 'sticky-sidebar'


export default class{

	constructor(){
        barba.hooks.afterOnce((data) => {
            this.init()
        });
        barba.hooks.after((data) => {
            this.init()
        });

    }
    init(){
        const sidebar = document.querySelector("#l-side")
        if(sidebar){
            window.Sidebar = new StickySidebar('#l-side', {
                containerSelector: '.js-sticky__wrapper',
                innerWrapperSelector: '.js-sticky__side',
                topSpacing: 80,
            })
            
            this.is_tablet()
            window.addEventListener("resize",() => {
                this.is_tablet()
            })
        }
     
    }
    is_tablet(){
        if(window.outerWidth < 992){
            window.Sidebar.destroy()
            
        }else{
            window.Sidebar.initialize()
        }
        
    }
}