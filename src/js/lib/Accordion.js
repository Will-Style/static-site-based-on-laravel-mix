
import barba from '@barba/core';
import gsap from 'gsap';

export default class {
    constructor(){
        this.accordion_wrapper = "[data-accordion]"
        this.accordion__trigger = "[data-accordion-trigger]"
        this.accordion__content = "[data-accordion-content]"
        this.active_class = 'c-accordion__active'

        this.triggers = []
        this.contents = []

        this.keys = {   
            "left": 37,
            "up": 38,
            "right": 39,
            "down": 40
        }
        barba.hooks.once((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        })
    }
    init (){
        this.accordions = []
        this.accordions_elements = document.querySelectorAll(this.accordion_wrapper)

        if(this.accordions_elements.length > 0){

            this.accordions_elements.forEach( (accordion, i ) => {
                
                const triggers = accordion.querySelectorAll(this.accordion__trigger)
                const contents = accordion.querySelectorAll(this.accordion__content)

               
                const accordionObj = {
                    id : i,
                    toggle: accordion.getAttribute('data-accordion'),
                    parent : accordion,
                    triggers : triggers,
                    contents : contents
                }

                if(triggers.length > 0){
                    triggers.forEach( (trigger, index) => {
                        if(trigger.classList.contains(this.active_class)){
                            trigger.setAttribute('aria-expanded',true);
                        }else{
                            trigger.setAttribute('aria-expanded',false);
                        }
                        this._addEvent(trigger,i,index,triggers,accordion,accordionObj);
                    })
                }
                if(contents.length > 0){
                    contents.forEach( (content, index) => {
                        if(!content.classList.contains(this.active_class)){
                            content.style.height = 0;
                            content.setAttribute('aria-hidden',true);
                        }else{
                            content.setAttribute('aria-hidden',false);
                        }
                    })
                }
                
                if(window.location.hash){
                    this.hashTarget = accordion.querySelector('[aria-controls="' + window.location.hash.replace('#','') + '"]')
                }

                if(this.hashTarget){
                    const id = this.hashTarget.getAttribute('aria-controls')
                    const contents = accordion.querySelector('#' + id)
                    if(contents){
                        
                        if(accordionObj.toggle){
                            this._closeAll(accordionObj)
                        }
                        this.hashTarget.classList.add(this.active_class);
                        this.hashTarget.setAttribute('aria-expanded',true);
                        this._animation(contents,'open');
                    }
                }

                this.accordions.push(accordionObj)
                
            })

           
              
            window.Accordion = this.accordions
        }          
    }
    _addEvent (el,i,index,triggers,accordion,accordionObj){
        el.addEventListener('click',(e) => {
            e.preventDefault();
            const id = el.getAttribute('aria-controls')
            const contents = accordion.querySelector('#' + id)
            if(contents){
                
                if(!contents.classList.contains(this.active_class)){
                    if(accordionObj.toggle){
                        this._closeAll(accordionObj)
                    }
                    e.currentTarget.classList.add(this.active_class);
                    e.currentTarget.setAttribute('aria-expanded',true);
                    this._animation(contents,'open');
                }else{
                    this._close(el,contents);
                }
                
            }
        })
        
        el.addEventListener('keydown',(e)=>{
            const k = e.which || e.keyCode;
            let position = index
            if (k >= this.keys.left && k <= this.keys.down){
                if (k == this.keys.left || k == this.keys.up){
                    if (position > 0) {
                        e.preventDefault()
                        position--
                        triggers[position].focus()
                    }
                }else if (k == this.keys.right || k == this.keys.down){
                    if (position < triggers.length-1 ) {
                        e.preventDefault()
                        position++
                        triggers[position].focus()
                    }
                }
            }
        })
    }
    _close (trigger,contents){

        if(trigger){
            trigger.classList.remove(this.active_class);
            trigger.setAttribute('aria-expanded',false);
        }
        
        if(contents){
            contents.classList.remove(this.active_class);
            this._animation(contents,'close');
        }
    }
    _closeAll (accordion){
        if(accordion.triggers.length > 0){
            accordion.triggers.forEach( t => {
                t.setAttribute('aria-expanded',false);
                t.classList.remove(this.active_class);
            }) 
        }
        if(accordion.contents.length > 0){
            accordion.contents.forEach( c => {
                if(c.classList.contains(this.active_class)){
                    c.classList.remove(this.active_class);
                    this._animation(c,'close');
                }
            }) 
        }
    }
    _animation (el,type){

        if(type=="open"){
            el.classList.add(this.active_class);
            el.style.height = 'auto';
            let height = el.clientHeight;
            el.setAttribute('data-height',height);
            el.setAttribute('aria-hidden',false);
            el.style.height = 0;
            
            gsap.to(el,{
                height:height,
                duration:.3,
                ease: "expo.out",
                onComplete: () => {
                    el.style.height = 'auto'
                }
            })
        }else{
            
            el.classList.remove(this.active_class);
            el.setAttribute('aria-hidden',true);
            gsap.to(el,{
                height:0,
                duration:.3,
                ease: "expo.out"
            })
        }
    }
}
