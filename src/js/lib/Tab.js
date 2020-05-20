
import barba from '@barba/core';

export default class{

	constructor(){
        this.tab_wrapper = '.js-tab'
        this.tab_item = '.js-tab__item'
        this.tab_pane = '.js-tab__pane'
        this.active_class = 'c-tab__active'
        barba.hooks.afterOnce((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }
    init(){
        this.tab = document.querySelectorAll(this.tab_wrapper);
        this.tab_navs = [];
        
    
        if(this.tab.length > 0){
            this.tab.forEach( (tab,i) => {
                const tab_items = tab.querySelectorAll( this.tab_item );
                this.tab_navs.push( tab_items )

                if(tab_items.length > 0){
                    tab_items.forEach( (tab_nav,index) => {
                        if(index == 0){
                            const pane_id = tab_nav.getAttribute('aria-controls');
                            this.tab_open(tab_nav,pane_id)
                        }
                        this._addEvent(tab_nav,i);
                    })
                }
            })
        }	
		
    }

    _addEvent (el,i){
        el.addEventListener('click',(e) => {
            
            this.tab_hide(i);

            const pane_id = el.getAttribute('aria-controls');
            this.tab_open(el,pane_id)
        })
    }
    tab_open(item,pane_id){
        const target_pane = document.querySelector( '#' + pane_id );
        if ( !target_pane ) return;

        item.classList.add(this.active_class);
        item.setAttribute("aria-selected",true)
        target_pane.classList.add(this.active_class);
        target_pane.removeAttribute("hidden")
    }
    tab_hide (i){
        const tab = this.tab[i]
        const item_active = tab.querySelector(this.tab_item+'.'+this.active_class);
        const pane_active = tab.querySelector(this.tab_pane+'.'+this.active_class);
        if(item_active){
            item_active.classList.remove(this.active_class);
            item_active.setAttribute("aria-selected",false)
        }
        if(pane_active){
            pane_active.classList.remove(this.active_class);
            pane_active.setAttribute("hidden","")
        }
    }
}