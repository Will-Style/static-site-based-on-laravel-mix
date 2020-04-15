
import barba from '@barba/core';
import Headroom from "headroom.js";

export default class{

    constructor(){
        barba.hooks.afterOnce((data) => {
            this.init()
        })
        barba.hooks.after((data) => {
            this.init()
        });
    }

	init(){
        const header = document.getElementById('l-header');
        if(header){
            const headroom  = new Headroom(header);
            headroom.init(); 
        }
	}
}