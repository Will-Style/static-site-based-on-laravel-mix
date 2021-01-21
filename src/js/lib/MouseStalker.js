
import barba from '@barba/core';

export default class{

	constructor(){
        this.mouseStalkerClass = "js-mouse-stalker";
        this.mouseCursorClass = "js-mouse-stalker__cursor";
        this.mouseFollowerClass = "js-mouse-stalker__follower";
        this.hoverClass = "is-hover";
        this.dragClass = "is-drag";

        const _ua = this._ua(window.navigator.userAgent.toLowerCase())

        barba.hooks.afterOnce(() => {
            if(!_ua.Mobile&&!_ua.Tablet){
                this.mouseStalker()
            }
        });
        barba.hooks.after(() => {
            if(!_ua.Mobile&&!_ua.Tablet){
                this.mouseStalker()
            }
        });
    }
    
    mouseStalker (){        

        
        const stalker = document.querySelector('.' + this.mouseStalkerClass);
        const cursor = document.querySelector('.' + this.mouseCursorClass);
        const follower = document.querySelector('.' + this.mouseFollowerClass);
        const links = document.querySelectorAll("a,button,input[type='submit']");
        const swipers = document.querySelectorAll(".swiper-container:not(.no-drag)");
        const cursorWidth = 20;
        let mouseX = 0;
        let mouseY = 0;
        if(stalker){
            document.addEventListener('mousemove', (e) => {
                stalker.style.opacity = 1;
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                cursor.style.transform = "translate(" + parseInt(mouseX - (cursorWidth / 2)) + "px," + parseInt(mouseY - (cursorWidth / 2)) + "px)";
                follower.style.transform = "translate(" + parseInt(mouseX - (cursorWidth / 2)) + "px," + parseInt(mouseY - (cursorWidth / 2)) + "px)";
            });
        }
        const linkEnter = (el) => {
            if(stalker){
                el.addEventListener('mouseenter', (e) => {
                    if(!stalker.classList.contains(this.dragClass)){
                        stalker.classList.add(this.hoverClass);
                    }
                })
            }
        }
        const linkLeave = (el) => {
            if(stalker){
                el.addEventListener('mouseleave', (e) => {
                    stalker.classList.remove(this.hoverClass);
                });
            }
        }

        const swiperEnter = (el) => {
            if(stalker){
                el.addEventListener('mouseenter', (e) => {
                    stalker.classList.add(this.dragClass);
                })
            }
        }
        const swiperLeave = (el) => {
            if(stalker){
                el.addEventListener('mouseleave', (e) => {
                    stalker.classList.remove(this.dragClass);
                });
            }
        }

        document.addEventListener('mouseleave', (e) => {
            if(stalker){
                stalker.style.opacity = 0;
            }
        });
        document.addEventListener('mouseenter', (e) => {
            if(stalker){
                stalker.style.opacity = 1;
            }
        });


        if(stalker){
            if(links.length > 0){
                links.forEach(element => {
                    linkEnter(element);
                    linkLeave(element);
                });
            }
            if(swipers.length > 0){
                swipers.forEach(element => {
                    swiperEnter(element);
                    swiperLeave(element);
                });
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
            || u.indexOf("playbook") != -1
            || u.indexOf('macintosh') > -1 && 'ontouchend' in document,
            Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
            || u.indexOf("iphone") != -1
            || u.indexOf("ipod") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
            || u.indexOf("blackberry") != -1
        }
    }
}