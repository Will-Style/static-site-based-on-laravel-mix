
import barba from '@barba/core';

import flatpickr from "flatpickr";
import { Ja } from "flatpickr/dist/l10n/ja.js"

export default class{

	constructor(){
        flatpickr.l10ns.ja.firstDayOfWeek = 0;
		barba.hooks.once((data) => {
            this.datePicker()
            this.timePicker()
        })
        
        barba.hooks.enter((data) => {
            this.datePicker()
            this.timePicker()
        })
        
    }
    
    datePicker(){
        flatpickr(".datepicker",{
            "locale": "ja",
            dateFormat: "Y.m.d"
            // mode: "multiple",
        });
    }
    timePicker(){
        flatpickr(".timepicker",{
            "locale": "ja",
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i"
        });
    }
}