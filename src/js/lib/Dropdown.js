
import barba from '@barba/core';

export default class{

	constructor(){

        
        this.dropdown_class = ".l-dropdown";
        this.trigger_class = ".l-dropdown__trigger";
        this.active_class = "l-dropdown-active";
        this.other_triggers_class = ".l-gnav__link:not(.l-dropdown__trigger)";

        barba.hooks.once((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }
    init (){
        
        this.dropdowns = [];
        this.triggers = [];

        this.triggers = document.querySelectorAll(this.trigger_class);
        this.dropdowns = document.querySelectorAll(this.dropdown_class);
        this.other_triggers = document.querySelectorAll(this.other_triggers_class);

        if(this.triggers.length > 0){
            this.triggers.forEach( (trigger,i) => {
                this.addEvent(trigger);
            })
            this.close();  
        }
        if(this.other_triggers.length > 0){
            this.other_triggers.forEach( (other_trigger,i) => {
                this.other_enter(other_trigger);
            })
        }
    }
    addEvent(el){
        // マウスオーバーで開く場合
        // el.addEventListener('mouseenter',(e) => {
        //     this.handler(el,e)
        // })
        el.addEventListener('click',(e) => {
            e.preventDefault();
            this.handler(el,e)
        })

        el.addEventListener('mouseleave',(e) => {
            this.leaveEvent(el);
        })
        // スクロールで閉じる場合
        // window.addEventListener('scroll',() => {
        //     this.close();
        // })
      
    }
    open(el,toggle){
        toggle.classList.add(this.active_class);
        el.classList.add(this.active_class);

        const rect = toggle.getBoundingClientRect();
                
        if(rect.right > window.innerWidth){
            toggle.style.right = 0;
        }
        if(rect.left < 0){
            toggle.style.left = 0;
        }
    }
    close(){
        const trigger_actives = document.querySelectorAll(this.trigger_class + "." + this.active_class)
        const dropdown_actives = document.querySelectorAll(this.dropdown_class + "." + this.active_class)
        if(dropdown_actives.length > 0){
            dropdown_actives.forEach( (dropdown,i) => {
                dropdown.classList.remove(this.active_class);
            })
        }
        if(trigger_actives.length > 0){
            trigger_actives.forEach( (trigger,i) => {
                trigger.classList.remove(this.active_class);
            })          
        }
    }
    handler(el,e){
        const toggle = document.querySelector("#" + el.getAttribute('data-toggle'))
        const self_open = el.classList.contains(this.active_class)
        if(toggle){
            this.close();
            if(!self_open){
                this.open(el,toggle);
            }
        }
    }
    leaveEvent(el){

        const toggle = document.querySelector("#" + el.getAttribute('data-toggle'))
        if(toggle){
            toggle.addEventListener('mouseleave',(e) => {
                this.close();
            });
        }
    }
    other_enter(el){
        el.addEventListener('mouseenter',(e) => {
            this.close();
        })
    }

}