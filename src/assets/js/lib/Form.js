
import barba from '@barba/core';

export default class{

	constructor(){
        this.ajaxZipUrl = "https://ajaxzip3.github.io/ajaxzip3.js";
        
        barba.hooks.once((data) => {
            this.agree()
            this.fileInput()
        })
        barba.hooks.afterOnce((data) => {
            this.appendApi();
            this.zip()
        })

        barba.hooks.enter((data) => {
            this.agree()
            this.fileInput()
        })
        barba.hooks.after((data) => {
            this.zip()
        });
    }
    
    agree(){

        const formEl = document.querySelector('[data-form]');
        let agree 
        let submit
        
        if(formEl){
            agree = formEl.querySelector("[data-agree]");
            submit = formEl.querySelector("input[type='submit']");
            
            if(agree && submit){
                this.agreeCheck(agree,submit)
                agree.addEventListener('click',() => {
                    this.agreeCheck(agree,submit)
                })
            }
        }
        
    }

    agreeCheck (agree,submit){
        if(agree.checked){
            submit.removeAttribute( 'disabled' ,'');
        }else{
            submit.setAttribute("disabled","disabled")
        }
    }

    zip (){
        const postCodeLabel = document.querySelector("[data-zip]");
        if(postCodeLabel){
            const postCode = document.querySelector('#' + postCodeLabel.getAttribute('data-zip'));
            const name = postCodeLabel.getAttribute('data-address');
            postCode.addEventListener('keyup',() => {
                AjaxZip3.zip2addr(postCode,'',name,name);
            })
            postCode.addEventListener('blur',() => {
                AjaxZip3.zip2addr(postCode,'',name,name);
            })
        }
    }

    fileInput (){
        const files = document.querySelectorAll("[data-file-input]");


        const fileSelected = (file) => {
            const value = getFileName(file.value);
            if(value!=""){
                file.nextElementSibling.innerText = value;
            }else{
                file.nextElementSibling.innerText = file.getAttribute('data-default-value');
            }
        }
        const getFileName = (value) => {
			var regex = /\\|\\/;
			var array = value.split(regex);
			return array[array.length - 1];	
        }
        
        
        if(files.length > 0){
            files.forEach((file) =>{
                file.setAttribute('data-default-value',file.nextElementSibling.innerText);
                file.addEventListener('change',() => {
                    fileSelected(file)
                })
            })
        }
    }

    

	appendApi (){
        const script = document.createElement('script');
        script.setAttribute("src", this.ajaxZipUrl ); 
        document.body.appendChild(script);
    }
    

}