
import barba from '@barba/core';
import Luxy from 'luxy.js';
export default class{

	constructor(){
		this.Luxy;
		barba.hooks.afterOnce((data) => {
            this.run()
        });
        barba.hooks.leave((data) => {
            this.Luxy.cancel()
        });
        barba.hooks.after((data) => {
            this.run()
        });
    }
    run (){
        const _ua = this._ua(window.navigator.userAgent.toLowerCase())
		const luxyEl = document.getElementById('luxy');
        if(luxyEl){
            if(!_ua.Mobile&&!_ua.Tablet){

                if(!navigator.userAgent.match(/Trident\/7\./)) {
                    this.Luxy = Luxy.init({
                        wrapperSpeed: .1
                    });
                }
            }
        }
    }
    _ua (u){
        return {
            Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
            || u.indexOf("ipad") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
            || u.indexOf("kindle") != -1
            || u.indexOf("silk") != -1
            || u.indexOf("playbook") != -1,
            Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
            || u.indexOf("iphone") != -1
            || u.indexOf("ipod") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
            || u.indexOf("blackberry") != -1
        }
    }
}