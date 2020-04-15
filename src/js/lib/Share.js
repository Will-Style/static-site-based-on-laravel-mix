
import Barba from "barba.js";

export default class{

	constructor(){

		const Share = function (){
			const shareTw = document.querySelectorAll('.btn-share-tw');
			const shareFb = document.querySelectorAll('.btn-share-fb');
			const windowOpen = document.querySelectorAll('.window-open');
		

			const open = function (el,name,width,height){
				if(el){
					const _name = (el.getAttribute('data-name')) ? el.getAttribute('data-name') : name;
					const _width = (el.getAttribute('data-width')) ? el.getAttribute('data-width') : width;
					const _height = (el.getAttribute('data-height')) ? el.getAttribute('data-height') : height;

					const x = (el.getAttribute('data-x')) ? el.getAttribute('data-x') : 60;
					const y = (el.getAttribute('data-y')) ? el.getAttribute('data-y') : 60;
					el.addEventListener('click',function(e){
						e.preventDefault();
						window.open(this.href, _name,'width='+_width+', height='+_height+',left='+x+', top='+y+', menubar=no, toolbar=no, scrollbars=yes'); return false;
					},true);
				}
			}

			if(shareTw.length > 0){
				for(let i = 0; i < shareTw.length; i ++){
					open(shareTw[i], "TWwindow",650,300);
				}
			}
			if(shareFb.length > 0){
				for(let i = 0; i < shareFb.length; i ++){
					open(shareFb[i], "FBwindow",650,450);
				}
			}
			
			if(windowOpen.length > 0){
				for(let i = 0; i < windowOpen.length; i ++){
					open(windowOpen[i], "ExWindow",650,800);
				}
			}

		}
		Barba.Dispatcher.on('transitionCompleted', Share);
	}
}