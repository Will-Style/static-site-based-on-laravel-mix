
import barba from '@barba/core';

export default class{

	constructor(){
        
        // Typekit ID
        this.TypekitId = false;
        // ※ Google Web Fontはcss内に追記
        // 読み込みたいCSSファイルやJSを配列で指定
        this.Resources = {
            "css": ["assets/css/icons.css"], // 
            "js" : []
        }
        
        barba.hooks.beforeOnce((data) => {
            this.loadResources();

            if(this.TypekitId){
                this.initTypeKit();
            }
        })
        
    }

    loadResources (){
        const head = document.head;
        const body = document.body;
        
        const local = window.location;
        const dirCount = this.strCount(local.pathname, '/');
        const rootUrl = this.getDir(local,dirCount);

        let source,script;
        if(rootUrl){
            const reg = new RegExp("^(http|https)://");
            if(this.Resources.css.length > 0){
                for(let i=0;i < this.Resources.css.length; i++){
                    if(this.Resources.css[i]!=""){
                        let url;
                        if(this.Resources.css[i].match(reg)){
                            url = this.Resources.css[i];
                        }else{
                            url = rootUrl + this.Resources.css[i];
                        }
                        source = document.createElement('link');
                        source.setAttribute("rel","stylesheet"); 
                        source.setAttribute("href", url); 
                        head.appendChild(source);
                    }
                }
            }

            if(this.Resources.js.length > 0){
                for(let i=0;i < this.Resources.js.length; i++){
                    if(this.Resources.js[i]!=""){
                        var url;
                        if(this.Resources.js[i].match(reg)){
                            url = this.Resources.js[i];
                        }else{
                            url = rootUrl + this.Resources.js[i];
                        }
                        script = document.createElement('script');
                        script.setAttribute("type","text/javascript"); 
                        script.setAttribute("src", url ); 
                        body.appendChild(script);
                    }
                }
            }
        }

    }
    initTypeKit (){
        (function(d) {
        let config = {
            kitId: TypekitId,
            scriptTimeout: 3000,
            async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){ return; }};s.parentNode.insertBefore(tk,s)
        })(document);
    }
    strCount(all, part) {
        return (all.match(new RegExp(part, 'g'))||[]).length;
    }
    getDir(place, n) {
        return place.pathname.replace(new RegExp('(?:/+[^/]*){0,' + ((n || 0) + 1) + '}$'), '/');
    }
}