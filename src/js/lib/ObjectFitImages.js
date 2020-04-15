
import barba from '@barba/core';
import objectFitImages from 'object-fit-images';

export default class{

	constructor(){
        barba.hooks.afterOnce((data) => {
            objectFitImages('img.object-fit-images', {watchMQ: true});
        })
	}
}