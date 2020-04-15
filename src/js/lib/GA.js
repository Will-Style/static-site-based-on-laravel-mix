


import barba from '@barba/core';
/**
 * Google Analyticsを更新する
 */
export default class{

	constructor(){
        barba.hooks.after((data) => {
            if (typeof ga === 'function') {
                ga('set', 'page', window.location.pathname);
                ga('send', 'pageview');
            }
            if (typeof gtag === 'function') {
                gtag('config', window.GA_MEASUREMENT_ID,{
                    page_path: window.location.pathname
                });
            }
        });
	}
}