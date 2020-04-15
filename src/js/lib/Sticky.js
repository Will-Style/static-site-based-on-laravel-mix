
import barba from '@barba/core';
import StickySidebar from 'sticky-sidebar'

export default class{

	constructor(){
        this.sticky_class = '.js-sticky';
        this.wrapper_class = '.js-sticky__wrapper'
        this.topSpacing = 100
        barba.hooks.once((data) => {
            this.run()
        })
        barba.hooks.leave((data) => {
            this.destroy();
        });
        barba.hooks.after((data) => {
            this.run()
        });
    }
    run (){
        this.sticky_el = document.querySelectorAll(this.sticky_class)
        if(this.sticky_el.length){
            this.sticky = new StickySidebar(this.sticky_class, {
                containerSelector: this.wrapper_class,
                topSpacing: this.topSpacing
            })
            this.sticky_el.forEach((el) => {
                el.addEventListener('affixed.top.stickySidebar', this.top);
                el.addEventListener('affixed.container-bottom.stickySidebar',this.bottom);
             })
            
        }
    }
    destroy(){
        this.sticky.destroy();

    }
    top( event ) {
        console.log('Sidebar has stuck top of viewport.');
    }
    bottom (event) {
        console.log('Sidebar has stuck bottom of viewport.');
    }
}