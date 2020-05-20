
import barba from '@barba/core';

export default class{

	constructor(){
        this.ajaxZipUrl = "https://ajaxzip3.github.io/ajaxzip3.js";
        this.form_class = '.mw_wp_form.mw_wp_form_input'
        this.form_confirm_class = '.mw_wp_form.mw_wp_form_confirm'
        barba.hooks.beforeOnce((data) => {
            this.agree()
        })
        barba.hooks.once((data) => {
            this.disabled_ime()
            this.fileInput()
            this.require()
        })
        barba.hooks.afterOnce((data) => {
            this.appendApi()
            this.zip()
        })

        barba.hooks.enter((data) => {
            this.disabled_ime()
            this.fileInput()
            this.require()
        })
        barba.hooks.after((data) => {
            this.zip()
        });
    }
    
    agree(){


        const agreeCheckConfirm = document.querySelector( this.form_confirm_class + ' #agree-check');
        
        if(agreeCheckConfirm){
            agreeCheckConfirm.checked = true;
        }
    }



    disabled_ime (){
        const formEl = document.querySelector(this.form_class);
        if(formEl){
            const alphanumerics = document.querySelectorAll(this.form_class + ' [data-alpha-numeric] input');

            const toHalfWidth = (str) => {
                return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                });
            }
            alphanumerics.forEach( (input) => {
                input.setAttribute("style","ime-mode:disabled");
                input.addEventListener('blur',() => {
                    input.value = toHalfWidth(input.value);
                })
            });
        }
    }

    require(){
        let error = true;
        
        const formEl = document.querySelector(this.form_class);

        if(formEl){
            const formSubmit = document.querySelector(this.form_class + ' input[type="submit"]');
            const requires = document.querySelectorAll(this.form_class + ' [data-required]');
            const requiresAnys = document.querySelectorAll(this.form_class + ' [data-required-any]');
            const requiresAlls = document.querySelectorAll(this.form_class + ' [data-required-all]');
            if(requires.length > 0){
                requires.forEach( (req) => {
                    const input = req.querySelector("input");
                    if(input){
                        if(input.getAttribute('type')=="email"){
                            input.setAttribute('pattern' ,"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")
                        }
                        input.setAttribute('required',true);
                    }
                    const select = req.querySelector("select");
                    if(select){
                        select.setAttribute('required',true);
                    }
                    const textarea = req.querySelector("textarea");
                    if(textarea){
                        textarea.setAttribute('required',true);
                    }
                })
            }
            if(requiresAnys.length > 0){
                requiresAnys.forEach( (req) => {
                    const inputs = req.querySelectorAll("input");
                    if(inputs.length > 0){
                        inputs.forEach( (input) => {
                            if(input.getAttribute('type')=="email"){
                                input.setAttribute('pattern' ,"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")
                            }
                            input.setAttribute('required',true);
                        })
                    }
                    const selects = req.querySelectorAll("select");
                    if(selects.length > 0){
                        selects.forEach( (select) => {
                            select.setAttribute('required',true);
                        })
                    }
                    const textareas = req.querySelectorAll("textarea");
                    if(textareas.length > 0){
                        textareas.forEach( (textarea) => {
                            textarea.setAttribute('required',true);
                        })
                    }
                })
                requiresAlls.forEach( (req) => {
                    const inputs = req.querySelectorAll("input");
                    if(inputs.length > 0){
                        inputs.forEach( (input) => {
                            input.setAttribute('required',true);
                        })
                    }
                    const selects = req.querySelectorAll("select");
                    if(selects.length > 0){
                        selects.forEach( (select) => {
                            select.setAttribute('required',true);
                        })
                    }
                    const textareas = req.querySelectorAll("textarea");
                    if(textareas.length > 0){
                        textareas.forEach( (textarea) => {
                            textarea.setAttribute('required',true);
                        })
                    }
                })
            }
            formSubmit.addEventListener("click", (e) => {
                requiresAnys.forEach( (req) => {
                    const inputs = req.querySelectorAll("input");
                    const selects = req.querySelectorAll("select");
                    const textareas = req.querySelectorAll("textarea");

                    const notEmptyInputs = inputs.filter((input) => {
                        if( input.getAttribute("type") !== "hidden"){
                            if( input.getAttribute("type") == "radio" || input.getAttribute("type") == "checkbox" ){
                                return input.checked;
                            }else{
                                return input.value!=""
                            }
                        }
                    })
                    const notEmptySelects = selects.filter((select) => {
                        return select.value!="";
                    })
                    const notEmptyTextareas = textareas.filter((textarea) => {
                        return textarea.value!="";
                    })
                    if(notEmptyInputs.length > 0){
                        inputs.forEach( (input) => {
                            input.removeAttribute('required');
                        })
                    }else{
                        inputs.forEach( (input) => {
                            input.setAttribute('required',true);
                        })
                    }
                    
                    if(notEmptySelects.length > 0){
                        selects.forEach( (select) => {
                            select.removeAttribute('required');
                        })
                    }else{
                        selects.forEach( (select) => {
                            select.setAttribute('required',true);
                        })
                    }
                    if(notEmptyTextareas.length > 0){
                        textareas.forEach( (textarea) => {
                            textarea.removeAttribute('required');
                        })
                    }else{
                        textareas.forEach( (textarea) => {
                            textarea.setAttribute('required',true);
                        })
                    }
                    if(notEmptyInputs.length > 0 && notEmptySelects.length > 0 && notEmptyTextareas.length > 0){
                        error = false
                    }else{
                        error = true
                    }
                })

                if(!error){
                    formEl.submit();
                }
                return false;
            })
        }
    }

    zip (){
        const postCodeLabel = document.querySelector(this.form_class + ' [data-zip]');
        if(postCodeLabel){
            const postCode = document.querySelector('#' + postCodeLabel.getAttribute('data-zip'));
            const name = postCodeLabel.getAttribute('data-address');
            postCode.addEventListener('blur',() => {
                AjaxZip3.zip2addr(postCode,'',name,name);
            })
        }
    }

    fileInput (){
        const fileLabels = document.querySelectorAll(this.form_class + ' [data-file-input]');


        const fileSelected = (label,file) => {
            const value = getFileName(file.value);
            if(value!=""){
                label.innerText = value;
            }else{
                label.innerText = file.getAttribute(this.form_class + ' data-default-value');
            }
        }
        const getFileName = (value) => {
			var regex = /\\|\\/;
			var array = value.split(regex);
			return array[array.length - 1];	
        }
        
        
        if(fileLabels.length > 0){
            fileLabels.forEach((label) =>{
                const file = document.querySelector('#' + label.getAttribute('for'))
                file.setAttribute('data-default-value',label.innerText);
                file.addEventListener('change',() => {
                    fileSelected(label,file)
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