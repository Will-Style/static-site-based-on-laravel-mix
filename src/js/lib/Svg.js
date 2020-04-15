
import barba from '@barba/core';

export default class{

	constructor(){

        barba.hooks.beforeOnce((data) => {
            this.fixSvgIntrinsicSizing();
            window.addEventListener("resize", this.fixSvgIntrinsicSizing, false);

        })
        barba.hooks.after((data) => {
            this.fixSvgIntrinsicSizing();
        });
    }
    fixSvgIntrinsicSizing () {

        let _win, _doc
        _win = window
        _doc = document
        if(_doc.documentMode) {
            let x = _doc.querySelectorAll("svg[viewBox]");
            if(x.length > 0) {
                for(let y, z, a, b, i = 0, l = x.length; i < l; i++) {
                    y = x[i];
                    if(!/noFixSvgIntrinsicSizing/.test(y.className.baseVal)) {
                    y.hasAttribute("preserveAspectRatio") &&
                    /slice/.test(y.getAttribute("preserveAspectRatio")) &&
                        (y.style.overflow = "hidden");
                        a = _win.getComputedStyle(y, "").width;
                        b = _win.getComputedStyle(y, "").height;
                        y.style.width = "";
                        y.style.height = "";
                        z = _win.getComputedStyle(y, "").height;
                        if(z !== "150px") {
                            y.style.width = a;
                            y.style.height = b;
                        }
                        else {
                            z = _win.getComputedStyle(y, "").width;
                            a = /([0-9.]+)px/.exec(z)[1] * 1;
                            b = this.getAspect(y.getAttribute("viewBox"));
                            a * b > _doc.documentElement.offsetHeight && (
                                y.style.height = (a * b) + "px",
                                z = _win.getComputedStyle(y, "").width,
                                a = /([0-9.]+)px/.exec(z)[1] * 1
                            );
                            y.style.width = z;
                            y.style.height = (a * b) + "px";
                        }
                    }
                }
            }
        }
    }
    getAspect(o) {
        return (o = o.split(" ")) && o[3] / o[2];
    }
}