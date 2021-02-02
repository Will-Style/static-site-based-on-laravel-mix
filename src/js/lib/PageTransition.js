

import anime from 'animejs';

export default class{
    /**
     * loading要素の初期設定等を行うコンストラクタ
     * DOM生成時に即時実行
     */
    constructor() {
        this.mask = document.querySelector('#js-loading__mask')
        this.first = "#js-loading__mask .js-loading__first"
        this.second = "#js-loading__mask .js-loading__second"
        this.logoAnimation_elm = document.querySelector('#logo-animation')
        if(this.mask){
            this.mask.style.display = "block"
        }

        if(process.env.MIX_DISP_LOADING == "false" && process.env.NODE_ENV == "development"){
            if(this.mask){
                this.mask.style.display = "none" 
            }
        }
    }
    /**
     * 初期表示前に1度だけ実行
     * @param {*} data 
     */
    beforeOnce(data){
        const self = this;
        return new Promise(resolve => {

            let timeline = anime.timeline();
            anime({
                targets:"#logo-lightning",
                rotateY:[0,"3600deg"],
                duration:4000,
                easing: 'easeInQuart',
            })
            timeline
            .add({
                targets: '#logo-animation',
                opacity:[0,1],
                translateY: ["30%", 0],
                easing: 'easeOutExpo',
                duration : 1000,
                complete: () =>{
                    
                    resolve();
                }
            // 初期読み込み時の待ち時間
            },600)
        })
    }
    /**
     * 初期表示時に1度だけ実行
     * @param {*} data 
     */
    once(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * 初期表示完了後に1度だけ実行
     * @param {*} data 
     */
    afterOnce(data){

        return new Promise(resolve => {
            const timelime = anime.timeline()
            timelime
            .add({
                targets: this.first ,
                translateY : [0,"-120%"],
                easing: 'easeOutCubic',
                duration : 600
            },200)
            .add({
                targets: this.second,
                translateY : [0,"-120%"],
                easing: 'easeInCubic',
                duration : 600,
            },'-=400')
            .add({
                targets: this.logoAnimation_elm,
                translateY: [ 0 ,"-200%"],
                opacity: [1,0],
                easing: 'easeInExpo',
                duration : 1000,
                complete: () =>{
                    this.mask.style.display = "none"
                    resolve();
                }
            // 初期読み込み時の待ち時間
            },1000)
        });
    }
    /**
     * 次ページ読み込み前に実行
     * @param {*} data 
     */
    beforeLeave(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * 次ページ読み込み時に実行
     * @param {*} data 
     */
    leave(data){

        return new Promise(resolve => {
            this.mask.style.display = "block"
            
            data.next.container.style.opacity = 0;
            const timelime = anime.timeline()
            timelime
            
            .add({
                targets: this.first,
                translateY : ["100%",0],
                easing: 'easeInCubic',
                duration : 500,
                complete : () => {
                    resolve();
                }
            })

        });
    }
    /**
     * 次ページ読み込み完了後に実行
     * @param {*} data 
     */
    afterLeave(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * 次ページ表示前に実行
     * @param {*} data 
     */
    beforeEnter(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * 次ページ表示時に実行
     * @param {*} data 
     */
    enter(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * 次ページ表示完了後に実行
     * @param {*} data 
     */
    afterEnter(data){
        return new Promise(resolve => {
            resolve();
        })
    }
    /**
     * すべて完了後に実行
     * @param {*} data 
     */
    after(data){

        return new Promise(resolve => {

            const timelime = anime.timeline()
            timelime
            .add({
                targets: this.first ,
                translateY : [0,"-120%"],
                easing: 'easeOutCubic',
                duration : 600,
                begin: () => {
                    this.initialScroll ()
                    data.next.container.style.opacity = 1;
                }
            },200)
            .add({
                targets: this.second,
                translateY : [0,"-120%"],
                easing: 'easeInCubic',
                duration : 600,
                complete : () => {

                    this.mask.style.display = "none"
                    resolve();
                }
            },'-=400')

            
        });
    }
    initialScroll (){
        if( location.hash == "" ){
            window.scrollTo(0,0);
        }else{
            let digit = location.hash.replace(/^#/,"");
            let anchor = document.getElementById( digit );
            if ( !anchor ) return;
            
            if(anchor){
                const rect = anchor.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let top = rect.top + scrollTop;
                const header = document.querySelector('[data-header]');
                if(header){
                    if(header){
                        top = top - header.clientHeight;
                    }
                }
                window.scrollTo(0,top);
            }
            
        }
    }
}