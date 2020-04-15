
import barba from '@barba/core';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';

export default class{

	constructor(){
        barba.hooks.beforeOnce((data) => {
            viewportUnitsBuggyfill.init({force: true});
        })
	}
}