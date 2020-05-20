
import Barba from "barba.js";

module.exports = class{

	constructor(){

        const init = function(){
            /iPhone|iPod|iPad|Android/i.test(navigator.userAgent) && document.documentElement.style.setProperty('--outer-height',`${window.outerHeight}px`)
        }
		Barba.Dispatcher.on('transitionStart', init);
	}
};