
import Barba from "barba.js";

module.exports = class{

	constructor(){
		var ajaxZipUrl = "https://ajaxzip3.github.io/ajaxzip3.js";
		var body = document.getElementsByTagName("body").item(0);
		
		var script;

		var isClick = false;

		function agree(){

			var inputForms = document.getElementsByClassName('mw_wp_form_input');
			var postNumber = document.getElementById("post-number");
			var Agree = document.getElementById("agree");

			if(inputForms){
				var agreeCheck = document.getElementById('agree-check');
			}
			if(agreeCheck){
				if(inputForms.length > 0){
					var submit = inputForms[0].querySelectorAll( "input[type='submit']" )[0];
					if(agreeCheck.checked){
						submit.removeAttribute( 'disabled' ,'');
					}else{
						submit.setAttribute("disabled","disabled")
					}
				}
			}
			if(postNumber){
				postNumber.addEventListener('blur',function(){
					AjaxZip3.zip2addr(this,'','住所','住所');
				})
			}
			if(Agree){
				Agree.addEventListener("click",function(){
					if(!isClick){
						isClick = true;
						setTimeout(function(){
							agree();
							isClick = false;
						},500)
					}
				});
			}
		}

		var AppendApi = function(){
			script = document.createElement('script');
			script.setAttribute("type","text/javascript"); 
			script.setAttribute("src", ajaxZipUrl); 
			body.appendChild(script);
		}
		AppendApi();

		function inputFile(){
			var fileFields = document.querySelectorAll('.input-group-file');
			
			var onClickEvent = function(el){
				var input = el.querySelectorAll('input[type="file"]');
				el.addEventListener('click',function(){
					selectFile(input[0])
				})
			}
			function getFileName(value) {
				var regex = /\\|\\/;
				var array = value.split(regex);
				return array[array.length - 1];	
			}
			var selectFile = function(el){
				el.click();
				el.addEventListener('change',function(){
					var text = el.parentNode.querySelectorAll('input[type="text"]');
					text[0].value = getFileName(this.value);
				})
			}

			if(fileFields.length > 0){
				for(var i = 0; i < fileFields.length; i++){
					onClickEvent(fileFields[i])
				}
			}

		}

		Barba.Dispatcher.on('newPageReady', agree);
		Barba.Dispatcher.on('newPageReady', inputFile);
	}

};