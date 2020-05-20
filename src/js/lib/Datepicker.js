
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
            // 日付フィールドを必須にするにはrequiredを指定して下記を有効にする必要があります。
            // allowInput: true,
            dateFormat: "Y.m.d",
            // mode: "multiple",
        });
    }
    timePicker(){
        flatpickr(".timepicker",{
            "locale": "ja",
            // 時間フィールドを必須にするにはrequiredを指定して下記を有効にする必要があります。
            // allowInput: true,
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i"
        });
    }
}