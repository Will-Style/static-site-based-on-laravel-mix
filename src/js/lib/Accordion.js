
import barba from '@barba/core';
import anime from 'animejs';

export default class{

    constructor(){
        this.accordion_wrapper = "js-accordion"
        this.accordion__trigger = "js-accordion__trigger"
        this.accordion__content = "js-accordion__content"
        this.active_class = 'c-accordion__active'

        barba.hooks.afterOnce((data) => {
            this.init()
        })
        barba.hooks.after((data) => {

            this.init()
        });
    }
    init (){
        this.accordions = document.querySelectorAll('.' + this.accordion_wrapper)
        this.triggers = []
        this.contents = []
        if(this.accordions.length > 0){

            this.accordions.forEach( (accordion, i ) => {
                const triggers = accordion.querySelectorAll('.' + this.accordion__trigger)
                const contents = accordion.querySelectorAll('.' + this.accordion__content)
                this.triggers.push(triggers)
                this.contents.push(contents)

                
                if(triggers.length > 0){
                    triggers.forEach( (trigger, index) => {
                        this._clickEvent(trigger,i,index);
                    })
                }
                if(contents.length > 0){
                    contents.forEach( (content, index) => {
                        if(!content.classList.contains(this.active_class)){
                            content.style.height = 0;
                        }
                    })
                }
            })
                
        }
        
    }
    _clickEvent (el,i,index){
        el.addEventListener('click',(e) => {
            // console.log(e)
            e.preventDefault();
            const contents = this.contents[i][index];
            //e.target クリックした要素
            if(contents){
                if(!contents.classList.contains(this.active_class)){
                    this.close(i);
                    e.currentTarget.classList.add(this.active_class);
                    this.animation(contents,'open');
                }else{
                    this.close(i);
                }
                const sidebar = document.querySelector("#l-side")
                if(sidebar){
                    if(window.Sidebar){
                        setTimeout(() => {
                            window.Sidebar.updateSticky()
                        }, 300);
                    }
                }
            }
        },false)
    }
    close (i){
        const accordion = this.accordions[i]
        const triggerActive = accordion.querySelector('.' + this.active_class)
        if(triggerActive){
            triggerActive.classList.remove(this.active_class);
        }
        let contentActive = accordion.querySelector('.' + this.active_class)
        if(contentActive){
            contentActive.classList.remove(this.active_class);
            this.animation(contentActive,'close');
        }
    }
    animation (el,type){

        if(type=="open"){
            el.classList.add(this.active_class);
            el.style.height = 'auto';
            let height = el.clientHeight;
            el.setAttribute('data-height',height);
            el.setAttribute('aria-hidden',false);
            el.style.height = 0;
            
            anime({
                targets: el,
                height:[0,height],
                duration:200,
                easing: 'easeOutExpo'
            })
        }else{
            
            el.classList.remove(this.active_class);
            el.setAttribute('aria-hidden',true);
            anime({
                targets: el,
                height:0,
                duration:100,
                easing: 'easeOutExpo',
                complete :function(){
                }
            })
        }
    }
}